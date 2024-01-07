import express, { Application, Response, json } from 'express';
import { userRoutes } from './src/modules/user/user.route';
import { AppDataSource } from './src/config/db';
import { Logger } from './src/utils/logger';
import { authRoutes } from './src/modules/auth/auth.route';
import { middleware } from './src/modules/middleware/middleware';
import env from './src/config/env';
import { myRedisConnection } from './src/config/redis';
import { ResOK } from './src/utils/response';

async function bootstrap() {
  const app: Application = express();
  const dbConnection = await AppDataSource.initialize();
  myRedisConnection();
  Logger.info(`isMysqlConnected: ${dbConnection.isInitialized}`);
  const { APP_PORT, NODE_ENV } = env;
  app.use(json());
  app.get('/', (_req, res: Response) =>
    ResOK(res, { status: 'it was a nice' }, 'ok'),
  );
  app.use(authRoutes);
  app.use(middleware, userRoutes);
  app.listen(APP_PORT, function () {
    Logger.success(`App ${NODE_ENV} is listening on port ${APP_PORT} !`);
  });
}

bootstrap();
