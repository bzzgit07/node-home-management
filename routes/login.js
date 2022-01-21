var express = require('express');
var router = express.Router();
var Admin = require('../db/admin');
const crypto = require('crypto');

const secret = 'nishishazi';

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.cookies.user != null && req.cookies.user != undefined) {
        // 进入login页面  一但发现有cookie  就要删除
        res.cookie('user', '1', {
            maxAge: 0 //当地址跳转到login页面，清除cookie
        })
    }
    res.render('login', {
        title: '微商城后台管理系统'
    });
});

router.post('/', function (req, res) {
    let {
        user,
        pass
    } = req.body;
    Admin.findOne({
        user: user,
        pass: crypto.createHmac('sha256', secret).update(pass).digest('hex'),
    }, (err, doc) => {
        if (err) throw err;
        if (doc != null) {
            res.cookie('user', {
                _id: doc._id,
                user: req.body.user,
                img: doc.head,
                job: doc.job,
                role: doc.role
            }, {
                httpOnly: true
            })
            res.send({
                code: 200,
                msg: "登录成功"
            })
        } else {
            res.send({
                code: 40001,
                msg: "账号密码不正确"
            })
        }
    })
})



module.exports = router;