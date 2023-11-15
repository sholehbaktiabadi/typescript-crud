import { Router } from "express";
import { UserRepository } from "./user.repository";
import { AppDataSource } from "../../config/db";
import { UserService } from "./user.service";

const prefix = '/user' 
const userRepo = new UserRepository(AppDataSource)
const userService = new UserService(userRepo)
const route = Router()

export const userRoutes = [
    route.post(prefix, (req, res)=> userService.create(req, res)),
    route.get(prefix, (req, res)=> userService.getAll(req, res)),
    route.get(prefix+ '/:id', (req, res)=> userService.findOne(req, res)),
    route.patch(prefix+ '/:id', (req, res)=> userService.update(req, res)),
    route.delete(prefix+ '/:id', (req, res)=> userService.delete(req, res))
]