import { Request } from 'express'

export interface IUser {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export interface IAuthError {
  name?: string
  email?: string
  password?: string
}

export interface IJwtDecode {
  id: number
}

export interface IReqUser extends Request {
  user?: IUser
}