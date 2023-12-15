import { Request, Response } from 'express';
import { ResErr, ResOK } from '../../utils/response';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import env from '../../config/env';
import { RedisExpOpt, RedisPrefixKey, redisSet } from '../../utils/redis';

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async login(req: Request, res: Response) {
    try {
      const { username, password }: User = req.body;
      const selected = await this.userRepository.findOneByUsername(username);
      if (!selected) return ResErr(res, 400, 'username is not registered');
      if (!password) return ResErr(res, 400, 'password required');
      const validation = bcrypt.compareSync(password, selected.password);
      if (!validation) return ResErr(res, 403, 'Invalid Password');
      delete selected.password;
      const token = jwt.sign({ id: selected.id }, env.JWT_SECRET, {
        expiresIn: '1d',
      });
      await redisSet(RedisPrefixKey.user, selected.id, token, RedisExpOpt.ONE_DAY)
      return ResOK(res, { ...selected, token });
    } catch (error) {
      return ResErr(res, 500, error);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { username, password }: User = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const data = await this.userRepository.create({
        username,
        password: hash,
      });
      const token = jwt.sign({ id: data.id }, env.JWT_SECRET, {
        expiresIn: '1d',
      });
      delete data.password;
      return ResOK(res, { ...data, token });
    } catch (error) {
      return ResErr(res, 500, error);
    }
  }
}
