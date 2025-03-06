//get user data 
const db = require('../db/index')
const bcrypt = require('bcryptjs')
exports.getUserInfo = (req,res)=> {
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'

    //if token validation passed, it will automacally having a property called req.user => now is req.auth
    db.query(sql, req.auth.id, (err,result)=> {
        //if query is fail
        if(err)return res.cc(err)

        //if query is ok, but result of data is empty
        if(result.length!==1) return res.cc('get user data fail')

        res.send({
            status:0,
            message:"get user info success",
            data: result[0]
        })
    })

}

exports.updateUserInfo = (req,res)=> {
    //define ur query
    const sql = 'update ev_users set ? where  id=?'
    db.query(sql, [req.body,req.body.id], (err,result)=> {
        if(err) return res.cc(err)
        if(result.affectedRows!==1) return res.cc('update user info fail')
        return res.cc('update success',0)
    })
}

exports.updatePassword = (req,res)=> {
 

    const sql = 'select * from ev_users where id = ?'
    db.query(sql,req.auth.id, (err,result)=> {
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc('invalid user')
        
        //result[0] means the database password
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if(!compareResult) return res.cc('old password error')

        //update dataabase
        const sql = 'update ev_users set password = ? where id=?'

        //encode password

        const newPwd = bcrypt.hashSync(req.body.newPwd,10)

        db.query(sql, [newPwd, req.auth.id], (err,result)=> {
            if(err) return res.cc(err)
            if(result.affectedRows !==1) return res.cc('update password fail')
            res.cc('update success',0)
        })
    })
}

exports.updateAvatar = (req,res)=> {
    const sql = 'update ev_users set user_pic = ? where id =?'
    db.query(sql, [req.body.avatar,req.auth.id], (err,result)=> {
        if(err) return res.cc(err)
        if(result.affectedRows!==1) return res.cc('update fail')
        return res.cc('update success',0)
    })
}
 