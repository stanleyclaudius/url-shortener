import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement>
export type FormSubmit = FormEvent<HTMLFormElement>

export interface IUser extends IRegisterData {
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface IAlert {
  error?: string
  success?: string
  loading?: boolean
}

export interface IAuth {
  token?: string
  user?: IUser
}

export interface IRegisterData extends ILoginData {
  name: string
}

export interface ILoginData {
  email: string
  password: string
}

export interface IUrl {
  id: number
  originalUrl: string
  shorterUrl: string
}

export interface IDeleteUrl {
  id: number
  token: string
}