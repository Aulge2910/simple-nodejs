const db = require('../db/index')

const bcrypt =  require('bcryptjs')

const jwt = require('jsonwebtoken')

const config = require('../schema/config')


//register user


exports.register = (req,res)=> {

    const userinfo = req.body
    console.log(userinfo)

    //1. first validation to check null value
    //if null value, return the program

    //old method of validation, will be replaced
    // if(!userinfo.username || !userinfo.password ){
    //     res.cc('invalid username or password')
    // }

    

    //2. if not null value, continue to check validation 
    //check if username is being taken
    //if there is data for this query, means there is username clash
    const sqlstr = 'select * from ev_users where username =?'
    db.query(sqlstr, userinfo.username, (err, result)=> {
        if(err){
            return res.cc(err)
        }

        //check if name being taken
        if(result.length >0){
            return res.cc('username already taken')
        }

        //if validation ok,  program will continue here  

        //if name ok, name can be used
        //encoded password, 10 is normally default value, ca  n be changed to other also
        userinfo.password = bcrypt.hashSync(userinfo.password,10)

        const sql = 'insert into ev_users set ?'

        db.query(sql, {username: userinfo.username, password: userinfo.password}, (err,result)=> {
            //check if sql run ok
            if(err) return res.cc(err)

            //if result row is not 1, also means fails
            if(result.affectedRows !==1) return res.cc('register user fail')

            //register success
            res.cc('register ok', 0)
        })


    })
 
}

//login user
exports.login = (req,res)=> {

    const userinfo = req.body

    const sql = 'select * from ev_users where username = ?'
    db.query(sql, userinfo.username, (err,result)=> {
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc('login fail')
            
        //here continue for login correct 

        const compareResult = bcrypt.compareSync(userinfo.password, result[0].password)
        if(!compareResult) return res.cc('login fail')
        
        
        //when correct do validation
        //such as jwt token
        const user = {...result[0], password:"", user_pic:""}
        
        //first parameter = item u wanna encrypt
        //second parameter = ur secret key
        const tokenStr = jwt.sign(user,config.jwtSecretKey,  {expiresIn: '10h'})
        res.send({
            status:0,
            message:"login success",
            token: "Bearer "+tokenStr
        })
    })
  
}
  