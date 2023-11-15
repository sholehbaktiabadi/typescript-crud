import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";

export class UserRepository{
    private userRepository: Repository<User>
    constructor(db: DataSource){
        this.userRepository = db.getRepository(User)
    }

    async create(dto: User){
        return await this.userRepository.save(dto)
    }

    async getAll(){
        return await this.userRepository.find()
    }

    async findOne(id: string){
        return await this.userRepository.findOne({ where: { id } })
    }

    async delete(id: string){
        return await this.userRepository.delete(id)
    }

    async update(id: string, dto: User){
        return await this.userRepository.update(id, dto)
    }
}