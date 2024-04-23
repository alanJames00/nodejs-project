const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.DB_HOST,
    port: 6379,
    password: process.env.DB_PASS,
});

module.exports = redis;