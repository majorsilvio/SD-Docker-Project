const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST ,
  port: parseInt(process.env.REDIS_PORT),
});

module.exports = redis;
