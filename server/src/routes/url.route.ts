import { isAuthenticated } from './../middlewares/auth'
import urlCtrl from './../controllers/urlCtrl'
import express from 'express'

const router = express.Router()

router.route('/')
  .post(isAuthenticated, urlCtrl.shortenUrl)
  .get(isAuthenticated, urlCtrl.getUrlsByUser)

router.route('/:id').delete(isAuthenticated, urlCtrl.deleteUrl)

export default router