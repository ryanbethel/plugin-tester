// let { join } = require('path')
const { OAuth2Server } = require('oauth2-mock-server')
let server = new OAuth2Server()

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
      // Generate a new RSA key and add it to the keystore
      await server.issuer.keys.generate('RS256')

      // Start the server
      await server.start(8080, 'localhost')
      console.log('Issuer URL:', server.issuer.url) // -> http://localhost:8080

      // Run operations upon Sandbox startup
    },
    watcher: async (/* params*/) => {
      // Act on filesystem events within your project
    },
    end: async (/* params*/) => {
      await server.stop()
      // Run operations upon Sandbox shutdown
    }
  }
}
