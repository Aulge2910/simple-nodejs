//import joi

const joi = require('joi')

//define the rules for username and password validation

const username = joi.string().alphanum().min(1).max(10).required()

const password  = joi.string().pattern(/^[\S]{6,12}$/).required()
 
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required()
//define rule for register and login

exports.register_login_schema = {
    body:{
        username,
        password
    }
}

exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

exports.update_password_schema = {
    body: {
       oldPwd:password,
       newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

exports.update_avatar_schema = {
 body: {
    avatar
 }
}