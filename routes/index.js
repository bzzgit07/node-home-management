var express = require('express');
var router = express.Router();
var WebSocket = require('ws');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.method)
  res.render('index', {
    title: '系统首页',
    url: "/",
    user: req.cookies.user
  });
});

module.exports = router;