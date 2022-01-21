var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('cart', {
        title: "购物车管理",
        url: "/cart",
        user: req.cookies.user
    })
});

module.exports = router;