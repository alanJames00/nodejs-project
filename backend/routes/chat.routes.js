const express = require("express");
const jwt = require('../utils/jwt')

// router setup
const chatRouter = express.Router();

//local file imports
const redis = require('./redis');


// test endpoints
chatRouter.get('/t', (req, res) => {
	res.json({
		info: 'hit chat/t'
	})
});

// create a new chat

// create a chat
chatRouter.post('/createChat', async (req, res) => {

	try {

		// check if the same chat grp with given name exist or not
		const { roomName, username } = req.body;

		// check for roomname and username 
		if (roomName == null || username == null) {
			res.status(400).json({
				error: 'roomName or username not provided'
			});
			return;
		}

		const redisKey = `chatroom:${roomName}:members`
		const redisResult = await redis.exists(redisKey)
		console.log(redisResult);
		if (redisResult == null) {

			// create a room set with the username
			await redis.sadd(`chatroom:${roomName}:members`, username);

			// now generate token
			const token = jwt.generateToken({ roomName, username });

			res.json({
				token
			})
		}
		else {

			// check if the user is already in the room
			const isMember = await redis.sismember(`chatroom:${roomName}:members`, username);
			if (isMember == 1) {
				res.status(400).json({
					err: 'user_exist'
				});
			}

			else {
				// add user to the room
				await redis.sadd(`chatroom:${roomName}:members`, username);

				// now generate token
				const token = jwt.generateToken({ roomName, username });

				res.json({
					token
				})

			}

		}
	}
	catch (e) {
		console.log(e);
		res.status(500).json(e);
	}
})



module.exports = chatRouter;
