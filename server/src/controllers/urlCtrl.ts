import { Response } from 'express'
import { IReqUser } from './../utils/Interface'
import { isURLValid, randomString } from '../utils/helper'
import { AppDataSource } from './../utils/dataSource'
import { Url } from './../entities/Url'

const urlCtrl = {
  shortenUrl: async(req: IReqUser, res: Response) => {
    try {
      const { originalUrl, shorterUrl } = req.body
      if (!originalUrl)
        return res.status(400).json({ error: 'Please provide original URL to be shorten.' })

      if (!isURLValid(originalUrl))
        return res.status(400).json({ error: 'Please provide valid original URL to be shorten.' })

      if (shorterUrl) {
        const isShorterUrlFound = await Url.findOne({ where: { shorterUrl } })

        if (isShorterUrlFound)
          return res.status(400).json({ error: 'Sorry, the shorter URL has been used before.' })
      }
      
      const randomShorterUrl = randomString()
      
      await AppDataSource.transaction(async t => {
        await t.query(
          `
            INSERT INTO url("originalUrl", "shorterUrl", "userId")
            VALUES($1, $2, $3)
          `
        , [originalUrl, shorterUrl ? shorterUrl : randomShorterUrl, req.user?.id])
      })

      return res.status(200).json({
        msg: 'URL has been shorten successfully.',
        data: {
          originalUrl,
          shorterUrl: shorterUrl ? shorterUrl : randomShorterUrl
        }
      })
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  },
  getUrlsByUser: async(req: IReqUser, res: Response) => {
    try {
      const urls = await AppDataSource.query(
        `
          SELECT *
          FROM url
          WHERE "userId" = $1
        `
      , [req.user?.id])

      return res.status(200).json({
        urls
      })
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  },
  deleteUrl: async(req: IReqUser, res: Response) => {

  }
}

export default urlCtrl