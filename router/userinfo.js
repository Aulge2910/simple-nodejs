const express = require('express')

const router = express.Router()

const expressJoi = require('@escook/express-joi')
//router 
const {update_userinfo_schema, update_password_schema, update_avatar_schema} = require('../schema/user')
const userinfo_handler = require('../router_handler/userinfo')

//get user info 
router.get('/userinfo', userinfo_handler.getUserInfo)

//update user info
router.post('/userinfo', expressJoi(update_userinfo_schema),userinfo_handler.updateUserInfo)

//update password info
router.post('/updatepwd', expressJoi(update_password_schema),userinfo_handler.updatePassword)

router.post('/update/avatar',expressJoi(update_avatar_schema),userinfo_handler.updateAvatar )



module.exports = router
