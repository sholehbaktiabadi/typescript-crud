import { DataSource } from 'typeorm';
import { User } from '../modules/user/user.entity';
import env from './env';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
  poolSize: 5,
  connectTimeout: 300000,
});
