const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const url = require('url');



// setup the websocket server
function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', async(ws, req) => {
    
    console.log('connected', ws);
    // check for token in the query string
    const token = url.parse(req.url, true).query.token;
    console.log(token);

  });
}



module.exports = startWebSocketServer;