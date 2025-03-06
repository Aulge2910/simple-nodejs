//router function of artcate
const db = require('../db/index')

exports.getArtCates = (req,res)=> {
    const sql = 'select * from ev_article_cate where is_delete =0 order by id asc'
    
    db.query(sql, (err,result)=>{
        if(err)return res.cc(err)
        res.send({
            status:0,
            message:"get articles success",
            data: result
        })
    })
}


exports.addArticleCates = (req,res)=> {
    
    const sql = "select * from ev_article_cate where name =? or alias = ?"
    db.query(sql, [req.body.name, req.body.alias], (err,result)=> {
        if(err) return res.cc(err)
        if(result.length===2) return res.cc('name and alias bering taken')
        if(result.length===1 && result[0].name === req.body.name && result[0].alias === req.body.alias) {
            return res.cc('name and alias being taken ')
        }
        if(result.length ===1 && result[0].name === req.body.name) return res.cc('name being taken')
        if(result.length ===1 && result[0].alias === req.body.alias) return res.cc('alias being taken')

        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, (err,result)=> {
            if(err) return res.cc(err)
            if(result.affectedRows !==1) return res.cc('add articles fails')

            res.cc('add article success',0)
        })
    })
}

exports.deleteCateById = (req,res)=> {
    const sql = 'update ev_article_cate set is_delete = 1 where id = ?'
    
    db.query(sql, req.params.id , (err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows!==1) return res.cc('delete fails')
        res.cc('delete success', 0)

    })
}

exports.getArtCateById = (req,res)=> {
    const sql = "select * from ev_article_cate where id = ?"

    db.query(sql, req.params.id, (err,result)=> {
        if(err) return res.cc(err)
        if(result.length!==1) return res.cc('get article info fails')
        res.send({
            status:0,
            message: 'get article data success',
            data: result[0]
        })
    })
}

exports.updateCateById = (req,res)=> {
    const sql = 'select * from ev_article_cate where id <>? and (name =? or alias=?)'

    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err,result)=> {

        if(err) return res.cc(err)
        if(result.length===2) return res.cc('name or alias taken')
        if(result.length===1 && result[0].name ===req.body.name && result[0].alias === req.body.alias) {
            return res.cc('name and alias taken')
        }
        if(result.length===1 && result[0].name === req.body.name) return res.cc('name taken')
        if(result.length===1 && result[0].alias === req.body.alias) return res.cc('alias taken')
         
        db.query(sql, [req.body, req.body.id], (err,result)=> {
            if(err) return res.cc(err)
            if(result.affectedRows!==1) return res.cc('update article fails')
            res.cc('update success',0)
        })
    })

}