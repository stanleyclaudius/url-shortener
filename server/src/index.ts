import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { DataSource } from 'typeorm'
import { User } from './entities/User'
import { Url } from './entities/Url'

dotenv.config()

const main = async() => {
  const conn = await new DataSource({
    type: 'postgres',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: true,
    synchronize: true,
    entities: [User, Url]
  })

  conn.initialize()

  const app = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  app.use(morgan('dev'))

  app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))
}

main()