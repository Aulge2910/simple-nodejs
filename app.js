//1. import express

const express = require('express')

//1.1 initialize a express app
const app = express()

const Joi = require('joi')
//2.  import cors
const cors = require('cors')



//2.1 initialize cors
app.use(cors())


//3. 解析表单的中间件 this format only-> x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))


//在router之前，封装一个优化res send的函数   =>res.cc

app.use((req,res,next)=> {
    //status 1 means error
    // status 0 means ok
    res.cc = function(err,status = 1){
      res.send({
        status,
        message: err instanceof Error ? err.message : err
      })
    }  
    next()
})


//must be setup before router
const {expressjwt: expressJWT} = require('express-jwt')

const config = require('./schema/config')

app.use(expressJWT({secret: config.jwtSecretKey, algorithms: ['HS256']}).unless({path:[/^\/api/]}))




//4. 配置user handler 
const userRouter =  require('./router/user')


//将user Router的中间件放进去
app.use('/api', userRouter)

const userInfoRouter  = require('./router/userinfo')
app.use('/my', userInfoRouter)


//article section


const artCateRouter = require('./router/artcate')

app.use('/my/article', artCateRouter)
//挂载my article category








//article
const articleRouter = require('./router/article')

app.use('/my/article', articleRouter)





//define error middleware
app.use((err,req,res,next)=> {
  if(err instanceof Joi.ValidationError) return res.cc(err)
  if(err.name ==='UnauthorizedError') return res.cc('token fails')
    res.cc(err)
 })





app.listen(3007, function() {
    console.log('api server running on http:127.0.0.1:3007')
})