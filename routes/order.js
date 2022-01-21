var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('order', {
        title: "订单管理",
        url: "/order",
        user: req.cookies.user
    })
});

module.exports = router;