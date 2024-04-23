const express = require("express");
const cors = require("cors");
require('dotenv').config();

// local file exports
const chatRouter = require('./routes/chat.routes');

// express setup
const PORT = process.env.PORT | 3001;
const app = express();

// middleware mount
app.use(cors());
app.use(express.json());

// router mounts
app.use('/chat', chatRouter)

app.get('/t', (req, res) => {
  res.json({
    info : "/t hit"
  });
})

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
})
