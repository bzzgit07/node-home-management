var express = require('express');
var router = express.Router();
var User = require("../db/user")


/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}, {
    _v: 0
  }, function (err, doc) {
    if (err) throw err;
    res.render('users', {
      title: "用户管理",
      url: "/users",
      user: req.cookies.user,
      deskuserList: doc
    })
  })




});

module.exports = router;