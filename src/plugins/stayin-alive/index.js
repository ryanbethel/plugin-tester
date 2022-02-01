const WebSocket = require('ws')
const SOCKET_PORT = 51000
let wss

module.exports = {
  sandbox: {
    start: async (/* params*/) => {
      wss = new WebSocket.Server({
        port: SOCKET_PORT
      })
      wss.on('connection', function open() {
        console.log('Frontend Listening')
      })
    },
    watcher: async (/* params*/) => {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          console.log('Refreshing Frontend')
          client.send('reload')
        }
      })
    },
    end: async (/* params*/) => {
      await wss.close()
    }
  }
}
