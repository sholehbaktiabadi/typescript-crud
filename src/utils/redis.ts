import { myRedis } from '../config/redis';

export enum RedisExpOpt {
  ONE_MINUTE = 60,
  ONE_HOUR = 3600,
  ONE_DAY = 86400,
}

export enum RedisPrefixKey {
  user = 'user',
}

export function redisSet(
  prefix: RedisPrefixKey,
  uniqueKey: string,
  value: any,
  expInSecond: number,
) {
  const prefixKey = `${prefix}_${uniqueKey}`;
  return myRedis.setEx(prefixKey, expInSecond, value);
}

export function redisGet(key: string) {
  return myRedis.get(key);
}

export function redisResponse(value: any) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
