var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('set', {
        title: "消息管理",
        url: "/set",
        user: req.cookies.user
    })
});

module.exports = router;