const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const url = require('url');


// global variable to store active users
let rooms = {};

function sendActiveUsers(ws) {


}


// setup the websocket server
function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', async(ws, req) => {
    
    console.log('connected', ws);
    // check for token in the query string
    const token = url.parse(req.url, true).query.token;
    console.log(token);

    // check if token is valid
    if (token == null) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'invalid_token'
        }));
      ws.close();
      return;
    }

    // verify the token
    try {
        const tokenRes = jwt.verify(token, process.env.JWT_SECRET);
        
        // tell the user that he is authenticated
        ws.send(JSON.stringify({
            type: 'authenticated',
            message: 'user_authenticated'
        }));
       
        

        // continue with the connection
        const username = tokenRes.username;
        const roomName = tokenRes.roomName;

        // add to the rooms
        if (rooms[roomName] == null) {
            rooms[roomName] = [];
        }
        rooms[roomName].push({ username, ws });

        console.log(rooms);
    }
    catch(err) {
        ws.send(JSON.stringify({
            type: 'error',
            message: 'invalid_token'
        }));
        ws.close();
        return;
    }
  });
}



module.exports = startWebSocketServer;