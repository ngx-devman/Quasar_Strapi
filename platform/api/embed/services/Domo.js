

const Keyv = require('keyv');
const cache = new Keyv();
const KEY_ACCESS_TOKEN = 'KEY_ACCESS_TOKEN';

const axios = require('axios');
const {ACCESS_TOKEN_URL, EMBED_TOKEN_URL_CARD, EMBED_TOKEN_URL_DASHBOARD, EMBED_URL_CARD, EMBED_URL_DASHBOARD} = require('../utils/domo-constants.js');

function getDomoAuthHeader() {
  if (!process.env.DOMO_CLIENT_ID || !process.env.DOMO_CLIENT_SECRET ) {
    throw new Error('The following variables must be declared in your .env file: DOMO_EMBED_ID, DOMO_CLIENT_ID, DOMO_CLIENT_SECRET.');
  }
  return {
    'Authorization': 'Basic ' + Buffer.from(process.env.DOMO_CLIENT_ID + ':' + process.env.DOMO_CLIENT_SECRET).toString('base64')
  };
}

async function refreshAccessToken() {
  await cache.delete(KEY_ACCESS_TOKEN);
  const token = await getAccessToken();
  return token;
}

async function getAccessToken() {
  const token = await cache.get(KEY_ACCESS_TOKEN);
  if(token) return token;
  let response;
  const headers = getDomoAuthHeader();
  try {
    response = await axios.get(ACCESS_TOKEN_URL, { headers });
  } catch(err) {
    console.log('Error occured while fetching domo auth token.', err.response.data);
    throw err;
  }
  if (response.status >= 400) {
    console.log('body', response.data);
    throw new Error(response.statusText);
  }
  
  const { data } = response;
  // We'll say it's expired 60 seconds before it actually does to make sure we aren't using an invalid access token.
  const accessTokenExpiration = Math.floor(Date.now() / 1000) + (data.expires_in - 60);
  console.log('domo access token created: valid until ' + accessTokenExpiration);
  const newToken = {
    userId: data.userId,
    accessToken: data.access_token
  };
  await cache.set(KEY_ACCESS_TOKEN, newToken, accessTokenExpiration * 1000);
  return newToken;
 
}

async function requestEmbedToken(accessToken, {embedId, filters, policies, type='card'}) {
  if(!filters) throw new Error('`filters` must not be null.');
  try {
    const response = await axios.post(type ==='card' ? EMBED_TOKEN_URL_CARD : EMBED_TOKEN_URL_DASHBOARD,
      {
        sessionLength: 1440, 
        authorizations: [
          {
            token: embedId, 
            permissions: ['READ', 'FILTER', 'EXPORT'], 
            filters: filters,
            policies: policies,
          }
        ]
      },  
      { 
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'content-type': 'application/json; chartset=utf-8',
          'accept': '*/*'
        } 
      }
    );
    return response;
  } catch(err) {
    console.log('Error occured while fetching embed token.', err.response.data);
    throw err;
  }
}

async function getEmbedToken(data) {
  const { accessToken } = await strapi.services.domo.getAccessToken();
  let response;
  try {
    response = await requestEmbedToken(accessToken, data);
  } catch (err) {
    // Retry once if token is invalid
    if(err.response && err.response.data && err.response.data.error === 'invalid_token') {
      console.log('Domo request rejected due to invalid token. Refreshing token and retrying...');
      const refreshedAccessToken = await strapi.services.domo.refreshAccessToken();
      response = await requestEmbedToken(refreshedAccessToken, data);
    } else throw err;
  }
 
  if (response.data.error) {
    console.log('body', response);
    throw new Error(response.data.error);
  }
  else if (response.status >= 400) {
    console.log('body', response.data);
    throw new Error(response.status);
  }
  const embedToken = response.data.authentication;
  return embedToken;
}

function getEmbedId(itemId) {
  return itemId;
}

function getEmbedUrl(embedId, type='card') {
  return `${type === 'card' ? EMBED_URL_CARD : EMBED_URL_DASHBOARD}${embedId}`;
}

module.exports = {
  getEmbedUrl,
  getEmbedId,
  getAccessToken,
  getEmbedToken,
  refreshAccessToken
};