var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var cotegory = require("../db/cotegory");
var fs = require("fs");
var path = require('path');
/* GET users listing. */
router.get('/', function (req, res, next) {
    let pCategory = new Promise((resolve, reject) => {
        cotegory.find({}, {
            _v: 0
        }, function (err, doc) {
            if (err) throw err;
            resolve(doc)
        })
    })
    Promise.all([pCategory]).then(response => {
        res.render('goods', {
            title: "商品管理",
            url: "/goods",
            user: req.cookies.user,
            category: response[0]
        })
    })
});

router.post('/file_upload', function (req, res) {
    var form = new formidable.IncomingForm();
    // 设置文件上传存放地址
    form.uploadDir = path.join(__dirname, '../public/goodsuploadImg/');
    //设置为多文件上传
    form.multiples = true;
    //是否包含文件后缀
    form.keepExtensions = true;


    form.parse(req, function (err, fields, files) {
        // console.log(fields)
        console.log(files);
        if (err) {
            throw err;
        }
        for (var i in files) {
            // __dirname：全局变量，存储的是文件所在的文件目录
            var oldpath = files[i].filepath;
            // 随机数
            var time = +new Date();
            var random = parseInt(Math.random() * 10000);
            //  获取图片的扩展名
            var extname = path.extname(files[i].originalFilename);
            // 新的文件名
            var newpath = path.join(__dirname, '../public/goodsuploadImg/') + time + random + extname;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                console.log("上传成功....")
            })
        }
        res.send({
            code: 200,
            msg: "上传成功"
        })
    })
})

module.exports = router;