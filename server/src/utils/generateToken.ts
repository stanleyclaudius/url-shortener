import { Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, { expiresIn: '7d' })
}

export const generateRefreshToken = (payload: any, res: Response) => {
  const token = jwt.sign(payload, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '30d' })

  res.cookie('urlShortify_refreshToken', token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/api/v1/auth/refresh_token'
  })

  return token
}