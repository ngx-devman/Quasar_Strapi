// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
const fs = require('fs')
const pkg = require('./package.json')
let serverName = 'experience.sourcesync.io'
let apiName = 'api.sourcesync.io'
let GAid = 'UA-165688420-2'
let dynamicPathFunction = 'window.SourceDigital.pathFunction' // Built in the experience service! :)
let publicPath = '[@@PUBLIC_PATH_HERE@@]'
const jwtSecret = require('../platform/extensions/users-permissions/config/jwt.js').jwtSecret

// If developing, use "development" by default
if (!process.env.SOURCE_ENV || (process.env.SOURCE_ENV !== 'development' && process.env.SOURCE_ENV !== 'demo' && process.env.SOURCE_ENV !== 'staging' && process.env.SOURCE_ENV !== 'unstable' && process.env.SOURCE_ENV !== 'prime' && process.env.SOURCE_ENV !== 'production' && process.env.SOURCE_ENV !== 'localhost' && process.env.SOURCE_ENV !== 'local_develop')) {
  process.env.SOURCE_ENV = 'development'
}
switch (process.env.SOURCE_ENV) {
  case 'localhost':
    serverName = 'localhost:1337'
    apiName = 'http://localhost:1337'
    GAid = 'UA-165688420-2'
    publicPath = '/'
    break
  case 'local_develop':
    apiName = 'https://api-dev.sourcesync.io'
    serverName = 'cdn.sourcesync.io/dev'
    GAid = 'UA-165688420-2'
    publicPath = '/'
    break
  case 'development':
    apiName = 'https://api-dev.sourcesync.io'
    serverName = 'cdn.sourcesync.io/dev'
    GAid = 'UA-165688420-2'
    break
  case 'staging':
    apiName = 'https://api-stg.sourcesync.io'
    serverName = 'cdn.sourcesync.io/stg'
    GAid = 'UA-165688420-4'
    break
  case 'unstable':
    apiName = 'https://api-unstable.sourcesync.io'
    serverName = 'cdn.sourcesync.io/unstable'
    GAid = 'UA-165688420-2'
    break
  case 'prime':
    apiName = 'https://api-prime.sourcesync.io'
    serverName = 'cdn.sourcesync.io/prime'
    GAid = 'UA-165688420-3'
    break
  case 'production':
    apiName = 'https://api.sourcesync.io'
    serverName = 'cdn.sourcesync.io/prod'
    GAid = 'UA-165688420-1'
    break
}

const isDevMode = ['localhost', 'local_develop'].includes(process.env.SOURCE_ENV)
module.exports = function (ctx) {
  console.log(`Building for ${process.env.SOURCE_ENV}`)
  return {
    // Passing things into the front-end during the build process...
    htmlVariables: {
      jwtSecret,
      apiName,
      SourceDigital: {
        build: {
          time: new Date(),
          ga: GAid,
          target: process.env.SOURCE_ENV,
          version: pkg.version,
          for: pkg.browserslist[0],
          on: {
            cpu: process.env.PROCESSOR_IDENTIFIER,
            os: process.env.OS,
            node: process.env.npm_config_node_version
          }
        }
      }
    },
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot: [
      'debug',
      'sockets',
      'events',
      'axios',
      'common',
      'pulse',
      'i18n',
      'tracking',
      'whisper',
      'analytics',
      'mixpanel',
      ...(isDevMode ? ['development'] : []),
      'zendesk',
      'cross-origin-msg-handler',
      'firebase'
      // 'experience'
    ],
    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.styl'
    ],
    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],
    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      cssAddon: true,
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack

      // To support smartblocks all components must be preloaded.
      // TODO optimize by choosing which component should be supported and imported.
      importStrategy: 'all',

      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Cookies',
        'Notify',
        'Dialog',
        'AppFullscreen'
      ]
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      // Quasar doesn't support dynamic paths, so we're defining a unique slug here, and replacing it with a function below...
      publicPath,
      appBase: '/',
      vueRouterBase: '/',
      env: {
        SMARTBLOCK_DEFAULT_VERSION: '0.3.0',
        SOURCE_ENV: process.env.SOURCE_ENV,
        API_BASE: apiName,
        SERVER_NAME: serverName,
        SOURCE_DEV_MODE: isDevMode,
        SOURCE_UI_VERSION: pkg.version,
        BUILD_TIME: (new Date()).toISOString(),
        SMARTBLOCK_DEFAULT_VERSION: '0.3.0'
      },
      afterBuild: function (cfg) {
        let c = cfg.quasarConf
        let distFolder = c.build.distDir + '/'
        const findFile = function (folder, pattern) {
          let dirCont = fs.readdirSync(folder)
          return dirCont.filter(e => e.match(pattern))[0]
        }
        // Find the CSS file and get it's contents...
        const cssVendor = fs.readFileSync(distFolder + 'css/' + findFile(distFolder + 'css', /vendor.[A-z0-9]{8}.css/)).toString()
        const cssApp = fs.readFileSync(distFolder + 'css/' + findFile(distFolder + 'css', /app.[A-z0-9]{8}.css/)).toString()
        const CSS = [cssVendor, cssApp].join()
        // Write the CSS file...
        console.log(`Writing app.css (${parseInt(CSS.length / 1024)}k)...`)
        fs.writeFileSync(distFolder + 'css/app.css', CSS)

        // Write the JavaScript file...
        const vendor = fs.readFileSync(distFolder + 'js/' + findFile(distFolder + 'js', /vendor.[A-z0-9]{8}.js/)).toString()
        console.log(dynamicPathFunction)
        // const app = fs.readFileSync(distFolder + 'js/' + findFile(distFolder + 'js', /app.[A-z0-9]{8}.js/)).toString()
        const app = fs.readFileSync(distFolder + 'js/' + findFile(distFolder + 'js', /app.[A-z0-9]{8}.js/)).toString().replace('"/[@@PUBLIC_PATH_HERE@@]/"', dynamicPathFunction)
        const embed = fs.readFileSync(distFolder + '../../embed.js').toString().replace('[@@SERVER_HERE@@]', serverName)
        let JS = [
          '\n// ## Compiler: vendors\n',
          vendor,
          '\n// ## Compiler: app\n',
          app
          // '\n// ## Compiler: runtime\n',
          // app
        ].join('\n')
        /*
          // We will probably never need this approach... - Nick 1/23/20
          console.log('Replacing "q-app" App.vue injection with EEID()')
          JS = JS.replace('"q-app"', 'EEID().id')
          console.log('Replacing "#q-app" Router injection with EEID()')
          JS = JS.replace('"#q-app"', '"#" + EEID().id')
          console.log('Injecting EEID replacement if not embedded...')
          JS = 'if(typeof EEID !== "function") EEID = function () { return { id: "q-app", distribution: undefined, embedded: false }; };\n' + JS
        */
        console.log(`Writing app.js (${parseInt(JS.length / 1024)}k)...`)
        fs.writeFileSync(distFolder + 'js/index.js', JS)
        fs.writeFileSync(distFolder + 'js/vendor.js', vendor)
        fs.writeFileSync(distFolder + 'js/app.js', app)
        // fs.writeFileSync(distFolder + 'js/runtime.js', runtime)
        console.log(`Writing embed.js (${parseInt(embed.length / 1024)}k)...`)
        fs.writeFileSync(distFolder + 'js/embed.js', embed)
      },
      scopeHoisting: true,
      vueRouterMode: 'history',
      showProgress: true,
      // vueCompiler: true,
      // gzip: true,
      analyze: false,
      extractCSS: true,
      // Options below are automatically set depending on the env, set them if you want to override
      preloadChunks: false,
      // extractCSS: false,
      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack (cfg) {
        /*
        cfg.output.filename = '[name]app.js'
        delete cfg.output.chunkFilename
        cfg.output.library = 'ExperienceEngine'
        cfg.output.libraryTarget = 'var'
        console.log(cfg)
        */
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish'),
            fix: true
          }
        })

        const Dotenv = require('dotenv-webpack')
        if (process.env.NODE_ENV === 'development') {
          cfg.plugins.push(new Dotenv({ path: './envfiles/development.env' }))
        } else {
          cfg.plugins.push(new Dotenv({ path: './envfiles/production.env' }))
        }
      }
    },
    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      // https: true,
      // port: 8080,
      /*
      proxy: {
        '/': {
          target: 'http://localhost:1337/experience',
          changeOrigin: true
        }
      },
      */
      open: true // opens browser window automatically
    },

    animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    // animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar App',
        // description: 'A Quasar Framework app',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'https://cdn.sourcesync.io/media/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'https://cdn.sourcesync.io/media/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'https://cdn.sourcesync.io/media/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'https://cdn.sourcesync.io/media/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'https://cdn.sourcesync.io/media/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'org.cordova.quasar.app'
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'foo'
      },

      // keep in sync with /src-electron/main-process/electron-main
      // > BrowserWindow > webPreferences > nodeIntegration
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
}
