var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require("fs");
var path = require('path');
const banner = require('../db/banner');
var Banner = require('../db/banner');
var mongoose = require('../db/db')
/* GET users listing. */
router.get('/', function (req, res, next) {
    Banner.find({}, {
        __v: 0
    }, function (err, doc) {
        if (err) {
            throw err
        }
        res.render('banner', {
            title: "轮播图管理",
            url: '/banner',
            user: req.cookies.user,
            banners: doc
        })
    })
});
router.post("/upload", function (req, res, next) {
    var form = new formidable.IncomingForm();
    // 设置文件上传存放地址
    form.uploadDir = path.join(__dirname, '../public/uploadImg/');
    form.parse(req, function (err, fields, files) {
        console.log(fields)
        // console.log(files);
        if (err) {
            throw err;
        }
        // __dirname：全局变量，存储的是文件所在的文件目录
        var oldpath = files.file.filepath;
        // 随机数
        var time = +new Date();
        var random = parseInt(Math.random() * 10000);
        //  获取图片的扩展名
        var extname = path.extname(files.file.originalFilename);
        // 新的文件名
        var newpath = path.join(__dirname, '../public/uploadImg/') + time + random + extname;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            if (fields._id) {
                Banner.update({
                    _id: mongoose.Types.ObjectId(fields._id)
                }, {
                    $set: {
                        img: '/uploadImg/' + time + random + extname,
                        desc: fields.desc,
                        url: fields.url
                    }
                }, err => {
                    if (err) throw err;
                    res.send({
                        code: 200,
                        msg: "修改数据成功",
                    })
                })
            } else {
                var banner = new Banner({
                    img: '/uploadImg/' + time + random + extname,
                    desc: fields.desc,
                    url: fields.url
                })
                banner.save(function (err, doc) {
                    if (err) throw err;
                    res.send({
                        code: 200,
                        msg: "上传图片成功",
                        data: doc
                    })
                })
            }
        })
    })
})


router.post("/del", function (req, res) {
    banner.remove({
        _id: mongoose.Types.ObjectId(req.body._id)
    }, err => {
        if (!err) {
            res.send({
                code: 200,
                msg: '删除数据成功'
            })
        } else {
            throw err
        }
    })
})



module.exports = router;