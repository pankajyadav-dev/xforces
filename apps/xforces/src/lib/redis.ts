import {Redis} from "ioredis";

const globalForRedis = global;


const RedisClientURL =  process.env.REDIS_URL || "redis://username:authpassword@127.0.0.1:6380/4" ;
export const redis: Redis = globalForRedis.redis || new Redis(RedisClientURL);


if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;

export default redis;