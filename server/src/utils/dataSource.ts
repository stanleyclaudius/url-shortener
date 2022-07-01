import dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { Url } from './../entities/Url'
import { User } from './../entities/User'

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'
let obj: Partial<DataSourceOptions> = {}

if (isProduction) {
  obj = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    migrations: ['dist/migrations/*.js'],
    entities: ['dist/entities/*.js']
  }
} else {
  obj = {
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: true,
    synchronize: true,
    entities: [User, Url]
  }
}

export const AppDataSource = new DataSource(obj as DataSourceOptions)