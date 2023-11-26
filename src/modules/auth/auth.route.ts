import { Router } from 'express';
import { AppDataSource } from '../../config/db';
import { UserRepository } from '../user/user.repository';
import { AuthService } from './auth.service';

const prefix = '/auth';
const userRepo = new UserRepository(AppDataSource);
const authService = new AuthService(userRepo);
const route = Router();

export const authRoutes = [
  route.post(prefix + '/login', (req, res) => authService.login(req, res)),
  route.post(prefix + '/register', (req, res) =>
    authService.register(req, res),
  ),
];
