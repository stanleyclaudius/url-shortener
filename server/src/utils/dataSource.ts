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
    url: 'postgres://vpyvpzkhamwnvc:0652a811d2d8f6e3251df0e57bcd9f3060caafd085ecacc54212cdd49ca06ef0@ec2-34-233-115-14.compute-1.amazonaws.com:5432/dlmusv5e5eraa',
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