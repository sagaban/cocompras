const colors = require('vuetify/es5/util/colors').default;

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3F51B5' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.plugin',
    {
      src: '~/plugins/isAuthenticated',
      mode: 'client'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // TODO: Enable `stylelint-module` when it db-data folder can be ignores
    // Doc: https://github.com/nuxt-community/stylelint-module
    // '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: `http://localhost:3000/api`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = 'eval-source-map';
      }
    }
  },
  serverMiddleware: [
    // Will register redirect-ssl npm package
    // 'redirect-ssl',

    // Will register file from project api directory to handle /api/* requires
    { path: '/api', handler: '~/api/index.js' }
  ]
};
