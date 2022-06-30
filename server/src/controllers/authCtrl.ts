import { Request, Response } from 'express'
import { User } from './../entities/User'
import { isEmailValid } from './../utils/checkEmail'
import { AppDataSource } from './../utils/dataSource'
import { IAuthError } from './../utils/Interface'
import bcrypt from 'bcrypt'

const authCtrl = {
  register: async(req: Request, res: Response) => {
    const error: IAuthError = {}
    const { name, email, password } = req.body

    if (!name) {
      error.name = 'Please provide your name to register.'
    }

    if (!email) {
      error.email = 'Please provide your email to register.'
    } else if (!isEmailValid(email)) {
      error.email = 'Please provide valid email address.'
    }

    if (!password) {
      error.password = 'Please provide your password to register.'
    } else if (password.length < 8) {
      error.password = 'Password should be at least 8 characters.'
    }

    if (Object.keys(error).length > 0) {
      return res.status(400).json({ error })
    }

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
  }
}

export default authCtrl