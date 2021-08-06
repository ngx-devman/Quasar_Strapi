/**
 * Items here are lazy loaded in production a la carte as needed. In order to enforce
 * lazy loading during the build process, you *MUST* only pull the components from
 * this list. If you pull them directly, they will be included in the base package (app.js).
 */
export default {
  fullLayout: () => import('layouts/full.vue'),
  titlebarLayout: () => import('layouts/titlebar-full.vue')
}
