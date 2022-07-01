import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { routes } from './routes'
import { AppDataSource } from './utils/dataSource'

dotenv.config()

AppDataSource.initialize()
  .then(() => {
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors({
      origin: `${process.env.CLIENT_URL}`,
      credentials: true
    }))
    app.use(cookieParser())
    app.use(morgan('dev'))

    app.use('/api/v1/auth', routes.auth)
    app.use('/api/v1/url', routes.url)

    app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))
  })
  .catch(err => console.log(err))