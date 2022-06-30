import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { router } from './routes'
import { AppDataSource } from './utils/dataSource'

dotenv.config()

AppDataSource.initialize()
  .then(() => {
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())
    app.use(cookieParser())
    app.use(morgan('dev'))

    app.use('/api/v1/auth', router.auth)

    app.listen(process.env.PORT, () => console.log(`Server is running on PORT ${process.env.PORT}`))
  })
  .catch(err => console.log(err))