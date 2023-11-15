import { DataSource } from "typeorm";
import { env } from "./env";
import { User } from "../modules/user/user.entity";

const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER } = env()

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
})