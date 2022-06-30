import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { Url } from './../entities/Url'
import { User } from './../entities/User'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: true,
  synchronize: true,
  entities: [User, Url]
})