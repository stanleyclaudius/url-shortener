import { ChangeEvent, FormEvent } from "react";

export type InputChange = ChangeEvent<HTMLInputElement>
export type FormSubmit = FormEvent<HTMLFormElement>

export interface IUser extends ILoginData {
  id: number
  name: string
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

export interface ILoginData {
  email: string
  password: string
}