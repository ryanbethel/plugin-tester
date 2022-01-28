// let { join } = require('path')
const util = require('util')
const fs = require('fs')
const browserSync = require('browser-sync').create()
module.exports = {
  // Setters
  // set: {
  //   env: (/* params*/) => {
  //     return {
  //       //   MY_ENV_VAR: 'ok',
  //       //   ANOTHER_VAR: { objects_and_arrays_are_automatically_json_encoded: 'neat!' }
  //     }
  //   }
  // },
  // Sandbox
  sandbox: {
    start: async (/* params*/) => {
      // const bsInit = util.promisify(browserSync.init)
      // await bsInit({
      browserSync.init(
        {
          reloadDelay: 1000,
          // reloadDebounce: 1000,
          // reloadThrottle: 1000,

          proxy: {
            target: 'http://localhost:3333',
            proxyReq: [
              function (proxyReq) {
                console.log('PROXY REQUEST:', proxyReq.headers)
              }
            ],
            proxyRes: [
              function (proxyRes, req, res) {
                console.log('PROXY RESPONSE:', proxyRes.headers)
              }
            ]
          },
          // cors: true,
          browser: 'google chrome',
          callbacks: { ready: () => console.log('ready!!!!!!!') }
        },
        () => console.log('init done')
      )
    },
    watcher: async (/* params*/) => {
      console.log('watch event happened')
      browserSync.notify('This message will only last a second', 1000)
      browserSync.reload()
    },
    end: async (/* params*/) => {
      await browserSync.exit()
    }
  }
}
