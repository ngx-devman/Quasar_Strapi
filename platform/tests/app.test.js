const fs = require('fs');
const { setupStrapi, cleanupStrapi } = require('./helpers/strapi');

/** this code is called once before any test is called */
beforeAll(async done => {
  await setupStrapi(); // singleton so it can be called many times
  done();
});

/** this code is called once before all the tested are finished */
afterAll(async done => {
  await cleanupStrapi();
  done();
});

it('strapi is defined', () => {
  expect(strapi).toBeDefined();
});