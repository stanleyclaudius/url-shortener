import { Response, NextFunction } from 'express'
import { IJwtDecode, IReqUser } from './../utils/Interface'
import { User } from './../entities/User'
import jwt from 'jsonwebtoken'

export const isAuthenticated = async(req: IReqUser, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')

    if (!token)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    const { id } = <IJwtDecode>await jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    if (!id)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    const user = await User.findOne({ where: { id } })
    if (!user)
      return res.status(401).json({ msg: 'Invalid authentication.' })

    req.user = user
    next()
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}