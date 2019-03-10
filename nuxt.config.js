const pkg = require("./package")

const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin")

let generateDir = {}
if (process.env.DEPLOY_ENV === "S3") {
  generateDir = {
    generate: { dir: "dist/app" }
  }
}

module.exports = {
  mode: "spa",
  ...generateDir,

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "blue",
    height: "5px"
  },

  /*
   ** Global CSS
   */
  css: ["~/assets/style/app.styl"],

  router: {
    middleware: ["clearValidationErrors"]
  },

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vuetify",
    "@/plugins/pusher",
    "./plugins/mixins/user.js",
    "./plugins/mixins/validation.js",
    "./plugins/axios.js",
    "~/plugins/google-maps",
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "@nuxtjs/dotenv"],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: "https://laravelv2-dot-eventer-1543384121468.appspot.com/api"
    baseURL: 'http://localhost/api',
  },

  // 認証
  auth: {
    strategies: {
      local: {
        endpoints: {
          /**
           * laravel側のapiのルーティングに対応するように書きましょう
           */
          login: {
            url: "admin/auth/login",
            method: "post",
            propertyName: "access_token"
          },
          user: {
            url: "auth/me",
            method: "get",
            propertyName: "data"
          },
          logout: {
            url: "auth/logout",
            method: "post"
          }
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    // vendor: [
    //   'gsap'
    // ],
    transpile: ["vuetify/lib"],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: "pre",
      //     test: /\.(js|vue)$/,
      //     loader: "eslint-loader",
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  }
}
