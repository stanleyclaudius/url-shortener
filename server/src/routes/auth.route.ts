import { isAuthenticated } from './../middlewares/auth'
import authCtrl from './../controllers/authCtrl'
import express from 'express'

const router = express.Router()

router.route('/register').post(authCtrl.register)
router.route('/login').post(authCtrl.login)
router.route('/refresh_token').get(authCtrl.refreshToken)
router.route('/logout').get(isAuthenticated, authCtrl.logout)

export default router