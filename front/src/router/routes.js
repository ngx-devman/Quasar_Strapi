
const routes = [
  {
    path: '/',
    component: () => import('layouts/full.vue'),
    children: [
      // The default page, letting you know everything works, but you aren't telling the engine to do anything...
      { path: '/', component: () => import('pages/experience.vue') },
      // The experience loader; you've provided an experience id or slug, so try to load everything up...
      { name: 'experience', path: '/:experience', component: () => import('pages/experience.vue'), props: true },
      // Screen kick; Our attempt at mobile Kurator...
      { path: '/:experience/kick', component: () => import('pages/kick.vue'), props: true },
      // For people with content access to a distribution, lets them see everything contained within it, like a Wikipedia Table of Contents...
      { path: '/:experience/contents', component: () => import('pages/contents.vue'), props: true },
      // For people with statistic access to a distribution, lets them see various metrics about a distribution that people may want more accessable...
      { path: '/:experience/statistics', component: () => import('pages/statistics.vue'), props: true },
      // Entering activations visted
      {
        name: 'experience.activation',
        path: '/:experience/:activationId',
        component: () => import('pages/experience.vue'),
        props: true
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
