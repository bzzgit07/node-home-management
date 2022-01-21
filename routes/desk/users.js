var express = require('express');
var request = require('request');
var router = express.Router();
var User = require('../../db/user')
/* GET users listing. */
router.post('/login', function (req, res, next) {
    let AppID = 'wx134b98d1614521b5';
    let AppSecret = '9a18ca3cdf7abe792bd31053ead0f8d5';
    let {
        code
    } = req.body
    let grant_type = 'authorization_code'
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${code}&grant_type=${grant_type}`

    request.get({
        url: url,
        json: true
    }, function (err, doc, data) {
        if (err) {
            throw err
        };
        res.send({
            code: 200,
            msg: "授权登录成功",
            data: data
        })
    })
});
router.post("/createuser", function (req, res, next) {
    if (req.body.openid) {
        let options = {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        };
        User.findOneAndUpdate({
                openid: req.body.openid
            }, req.body, options,
            function (err, doc) {
                if (err) {
                    throw err
                };
                res.send({
                    code: 200,
                    msg: "授权登录成功",
                    data: doc
                })
            })
    }

})



module.exports = router;