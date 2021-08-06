// Temporary solution for api migration

const axios = require('axios')
const path = require('path')
require('dotenv').config({path: path.join(__dirname, '.env')})
const api = axios.create({baseURL: process.env.BASE_URL});


const version = '0.9.0';
const configs = require('./'+ version);

(async () => {
  try {
    const { data: { data: { token } } } = await api.post('/admin/login', {email: process.env.EMAIL, password:process.env.PASSWORD})
    const headers = { Authorization: `Bearer ${token}`, 'content-type': 'application/json'}
    console.log(token)
   
    for(const config of configs) {
      await api.request({...config, headers})
    }
  } catch (e) {
    console.error(e)
  }
})();
