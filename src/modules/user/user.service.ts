import { Request, Response } from 'express';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { ResErr, ResOK } from '../../utils/response';
import {
  RedisExpOpt,
  RedisPrefixKey,
  redisGet,
  redisResponse,
  redisSet,
} from '../../utils/redis';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(req: Request, res: Response) {
    try {
      const { username, password }: User = req.body;
      if (!username || !password)
        return ResErr(res, 400, 'username & password is required');
      const data = await this.userRepository.create({ username, password });
      return ResOK(res, data);
    } catch (error) {
      return ResErr(res, 500, error);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const selected = await this.userRepository.findOne(id);
      if (!selected) return ResErr(res, 400, 'data not found');
      return ResOK(res, selected);
    } catch (error) {
      return ResErr(res, 500, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const selected = await this.userRepository.findOne(id);
      if (!selected) return ResErr(res, 400, 'data not found');
      const body: User = req.body;
      const newData = { ...selected, ...body };
      const update = await this.userRepository.update(id, newData);
      return ResOK(res, update);
    } catch (error) {
      return ResErr(res, 500, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const isDataExist = await this.userRepository.findOne(id);
      if (!isDataExist) return ResErr(res, 400, 'data not found');
      const data = await this.userRepository.delete(id);
      return ResOK(res, data);
    } catch (error) {
      return ResErr(res, 500, error);
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      let data: any;
      data = await redisGet(`${RedisPrefixKey.user}_all`);
      if (data) {
        return ResOK(res, redisResponse(data));
      } else {
        data = await this.userRepository.getAll();
        redisSet(
          RedisPrefixKey.user,
          'all',
          JSON.stringify(data),
          RedisExpOpt.ONE_MINUTE,
        );
        return ResOK(res, data);
      }
    } catch (error) {
      return ResErr(res, 500, error);
    }
  }
}
