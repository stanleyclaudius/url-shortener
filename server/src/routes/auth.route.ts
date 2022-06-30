import express from 'express'
import authCtrl from './../controllers/authCtrl'

const router = express.Router()

router.route('/register').post(authCtrl.register)

export default router