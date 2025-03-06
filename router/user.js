const express = require('express')

//create router object
const router = express.Router()

//import from router handler

const user_handler = require('../router_handler/user')

//import the middleware that is used to validate 
const expressJoi = require('@escook/express-joi')

const {register_login_schema} =  require('../schema/user')


router.post('/register', expressJoi(register_login_schema), user_handler.register)
router.post('/login', expressJoi(register_login_schema), user_handler.login)

module.exports = router 