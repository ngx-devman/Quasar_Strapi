"use strict";
const fs = require("fs");
const get = require("lodash/get");

const requestIp = require("request-ip");

const { Reader } = require("@maxmind/geoip2-node");
const buffer = fs.readFileSync("public/geo-location-city.mmdb");
const reader = Reader.openBuffer(buffer);
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require("strapi-utils");

const getClientLocation = (ip) => {
  if (!ip) return {};
  try {
    const data = reader.city(ip);

    const geoData = {
      continent: get(data, "continent.code", ""),
      country: get(data, "country.isoCode", ""),
      city: get(data, "city.names.en", ""),
      postalCode: get(data, "postal.code", ""),
      latitude: get(data, "location.latitude", ""),
      longitude: get(data, "location.longitude", ""),
      timezone: get(data, "location.timeZone", ""),
      isAnonymousVpn: get(data, "traits.isAnonymousVpn", ""),
    };

    const location = `[${geoData.latitude}, ${geoData.longitude}] ${geoData.city}(${geoData.postalCode}), ${geoData.country}, ${geoData.continent} (${geoData.timezone})`;
    return {
      ...geoData,
      location,
    };
  } catch {
    return {};
  }
};

const getClientIp = (req) => {
  try {
    return requestIp.getClientIp(req);
  } catch {
    return null;
  }
};

module.exports = {
  create: async (ctx) => {
    const ip = getClientIp(ctx.request);
    const geolocation = getClientLocation(ip);
    const body = { ...ctx.request.body, ...geolocation, ip };
    const entity = await strapi.query("analytic").create(body);

    return sanitizeEntity(entity, { model: strapi.models.analytic });
  },
};
