import { Request, Response } from 'express'
import { User } from './../entities/User'
import { isEmailValid } from './../utils/helper'
import { AppDataSource } from './../utils/dataSource'
import { IAuthError, IJwtDecode } from './../utils/Interface'
import { generateAccessToken, generateRefreshToken } from './../utils/generateToken'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const authCtrl = {
  register: async(req: Request, res: Response) => {
    const error: IAuthError = {}
    const { name, email, password } = req.body

    if (!name)
      error.name = 'Please provide your name to register.'

    if (!email)
      error.email = 'Please provide your email to register.'
    else if (!isEmailValid(email))
      error.email = 'Please provide valid email address.'

    if (!password)
      error.password = 'Please provide your password to register.'
    else if (password.length < 8)
      error.password = 'Password should be at least 8 characters.'

    if (Object.keys(error).length > 0)
      return res.status(400).json({ error })

    const hashedPassword = await bcrypt.hash(password, 12)

    try {
      const result = await AppDataSource
                            .getRepository(User)
                            .createQueryBuilder()
                            .insert()
                            .into(User)
                            .values({
                              name,
                              email,
                              password: hashedPassword
                            })
                            .returning('*')
                            .execute()

      const user = result.raw[0]

      return res.status(200).json({
        msg: 'Account has been registered successfully.',
        user
      })
    } catch (err: any) {
      return res.status(500).json({ error: 'Email has been registered before.' })
    }
  },
  login: async(req: Request, res: Response) => {
    const error: IAuthError = {}
    const { email, password } = req.body
    
    if (!email)
      error.email = 'Please provide your email to login.'
    else if (!isEmailValid(email))
      error.email = 'Please provide valid email address.'

    if (!password)
      error.password = 'Please provide your password to login.'

    if (Object.keys(error).length > 0)
      return res.status(400).json({ error })

    try {
      const user = await User.findOne({ where: { email } })
      if (!user)
        return res.status(400).json({ error: 'Invalid credential.' })

      const isPwMatch = await bcrypt.compare(password, user.password)
      if (!isPwMatch)
        return res.status(400).json({ error: 'Invalid credential.' })

      const accessToken = generateAccessToken({ id: user.id })
      generateRefreshToken({ id: user.id }, res)

      return res.status(200).json({
        msg: `Authenticated as ${user.name}`,
        accessToken,
        user
      })
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  },
  refreshToken: async(req: Request, res: Response) => {
    const { urlShortify_refreshToken: token } = req.cookies
    if (!token)
      return res.status(401).json({ msg: 'Invalid authentication.' })
    
    const { id: userId } = <IJwtDecode>await jwt.verify(token, `${process.env.REFRESH_TOKEN_SECRET}`)
    if (!userId)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    const user = await User.findOne({ where: { id: userId } })
    if (!user)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    const accessToken = generateAccessToken({ id: userId })
    generateRefreshToken({ id: userId }, res)

    return res.status(200).json({
      accessToken,
      user
    })
  },
  logout: async(req: Request, res: Response) => {
    res.clearCookie('urlShortify_refreshToken', {
      path: '/api/v1/auth/refresh_token'
    })

    return res.status(200).json({ msg: 'Logout success.' })
  }
}

export default authCtrl