var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('admin', {
        title: "角色管理",
        url: "/admin",
        user: req.cookies.user
    })
});

module.exports = router;