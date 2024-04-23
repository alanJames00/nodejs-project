const express = require("express");


// router setup
const chatRouter = express.Router();

//local file imports
const redis = require('./redis');


// test endpoints
chatRouter.get('/t', (req, res) => {
  res.json({
    info : 'hit chat/t'
  })
});

// create a new chat

// create a chat
chatRouter.post('/createChat', async (req, res) => {

  try {

    // check if the same chat grp with given name exist or not
    const { roomName, password, isPasswordProtected } = req.body;

    const redisKey = `chatroom:${roomName}`
    const redisResult = await redis.get(redisKey)
    
    if(redisResult == null) {
      console.log('room does not exist');
      // create the room
    }
    else {
      console.log('room exists');
    }
    
  }
  catch(e) {
    console.log(e);
    res.status(500).json(e);
  }
})



module.exports = chatRouter;
