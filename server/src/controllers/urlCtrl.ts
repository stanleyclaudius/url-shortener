import { Request, Response } from 'express'
import { IReqUser } from './../utils/Interface'
import { isURLValid, randomString } from './../utils/helper'
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
  getUrlById: async(req: Request, res: Response) => {
    try {
      const url = await Url.findOne({ where: { shorterUrl: req.params.id } })
      if (!url)
        return res.status(404).json({ error: 'URL not found.' })

      return res.status(200).json({ url })
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
          ORDER BY id DESC
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
    try {
      const findUrl = await AppDataSource.query(
        `
          SELECT *
          FROM url
          WHERE "shorterUrl" = $1 AND "userId" = $2
        `
      , [req.params.id, req.user?.id])

      if (findUrl.length === 0)
        return res.status(400).json({ error: 'This user doesn\'t own chosen URL.' })

      await AppDataSource
              .getRepository(Url)
              .createQueryBuilder()
              .delete()
              .from(Url)
              .where('"shorterUrl" = :shorterUrl', { shorterUrl: req.params.id })
              .execute()

      return res.status(200).json({ msg: 'URL has been deleted successfully.' })
    } catch (err: any) {
      return res.status(500).json({ error: err.message })
    }
  }
}

export default urlCtrl