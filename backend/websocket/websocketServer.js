const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const url = require('url');
const redis = require('../routes/redis');
const uuid = require('uuid');
const s3 = require('../utils/s3');

// global variable to store active users
let rooms = {};

function sendActiveUsers(ws, roomName) {
    const users = rooms[roomName].map(user => user.username)
    // remove duplicates from the array
    const uniqueUsers = [...new Set(users)];

    // send to everyone in the room
    rooms[roomName].forEach(user => {
        if(user.ws.readyState === WebSocket.OPEN) {
            user.ws.send(JSON.stringify({
                type: 'active_users',
                users: uniqueUsers
            }));
        }
    });
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
        // send active users
        sendActiveUsers(ws, roomName);


        // handle incoming messages
        ws.on('message', async (message) => {
            
            const parsedMessage = JSON.parse(message);
            console.log("parsedMessage", parsedMessage);

            // check for the type of message
            if (parsedMessage.type === 'message') {
                // send the message to everyone in the room

                // get current time
                const time = new Date().toLocaleTimeString();

                console.log('received message', parsedMessage);
                rooms[roomName].forEach(user => {
                    if(user.ws.readyState === WebSocket.OPEN) {
                        user.ws.send(JSON.stringify({
                            type: 'message',
                            sender: username,
                            message: parsedMessage.message,
                            time
                        }));
                    }
                });
            }

            else if(parsedMessage.type == 'file_upload_request') {
                
                console.log('entered file upload request');
                // generatea fileid using uuid
                const fileId = uuid.v4();
                // add it to redis
                await redis.set(`file:${fileId}`, JSON.stringify({
                    filename: parsedMessage.filename,
                    size: parsedMessage.size,
                    sender: username,
                }));
                
                // generate the presigned url
                try {
                    const presignedUrl = await s3.generatePresignedUrl(fileId);
                    console.log('presignedUrl', presignedUrl);
                    ws.send(JSON.stringify({
                        type: 'file_upload_response',
                        presignedUrl,
                        fileId,
                        uploadStatus: 'pending'
                    }));
                }
                catch(err) {
                    console.log('error generating presigned url', err);
                    ws.send(JSON.stringify({
                        type: 'file_upload_err'
                    }));
                }
            }

            // handle file upload success
            else if(parsedMessage.type == 'file_upload_success') {
                // send the file id to everyone in the room
                // get the file details from redis
                const prevData = await redis.get(`file:${parsedMessage.fileId}`);
                const fileData = JSON.parse(prevData);
                fileData.uploadStatus = 'success';
                await redis.set(`file:${parsedMessage.fileId}`, JSON.stringify(fileData));
                console.log('fileData', fileData);
                console.log(parsedMessage.fileId)
                
                // generate the download url
                const downloadUrl = await s3.generatePresignedDownloadUrl(parsedMessage.fileId);
                console.log('downloadUrl', downloadUrl);
                rooms[roomName].forEach(user => {
                    if(user.ws.readyState === WebSocket.OPEN) {
                        user.ws.send(JSON.stringify({
                            type: 'file',
                            fileId: parsedMessage.fileId,
                            downloadUrl,
                            filename: fileData.filename,
                            sender: fileData.sender,
                            size: fileData.size
                        }));
                    }
                });
            }
            
        });








        // handle disconnect
        ws.on('close', () => {
            console.log('disconnected');
            rooms[roomName] = rooms[roomName].filter(user => user.ws !== ws);
            console.log(rooms);
            sendActiveUsers(ws, roomName);
        });
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