import dotenv from 'dotenv';
dotenv.config();

export const env = () => ({
  APP_PORT: process.env.APP_PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT as string),
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
});
