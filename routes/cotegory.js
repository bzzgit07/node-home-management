var express = require('express');
var router = express.Router();
var cotegory = require('../db/cotegory')

/* GET users listing. */
router.get('/', function (req, res, next) {
    cotegory.find({}, function (err, doc) {
        if (err) throw err;
        res.render('cotegory', {
            title: "商品分类",
            url: "/cotegory",
            user: req.cookies.user,
            cotegoryList: doc
        })
    })

});


router.get("/add", function (req, res, next) {
    let options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    };
    cotegory.findOneAndUpdate({
        name: req.query.name
    }, {
        name: req.query.name
    }, options, function (err, doc) {
        if (err) {
            throw err
        };
        res.send({
            code: 200,
            msg: "添加成功",
            data: doc
        })
    })
})




module.exports = router;