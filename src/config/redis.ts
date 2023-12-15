import { createClient } from 'redis';
import env from './env';
import signale from 'signales';

export const myRedis = createClient({
  url: `redis://@${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

export async function myRedisConnection() {
  myRedis
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect().then(()=> signale.info('isMyRedisConnected: true'));
}
