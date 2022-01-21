var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var tablist = require('./util/tablist')
var logger = require('morgan');

// 前台接口api
var deskLoginRouter = require('./routes/desk/users')
var deskIndexRouter = require('./routes/desk/index')





// 后台模板引擎中间件
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require("./routes/login");
var bannerRouter = require('./routes/banner');
var cartRouter = require('./routes/cart');
var goodsRouter = require("./routes/goods");
var orderRouter = require('./routes/order');
var setRouter = require('./routes/set');
var adminRouter = require('./routes/admin');
var cotegoryRouter = require('./routes/cotegory')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.all("*", function (req, res, next) {
  if (req.originalUrl.startsWith('/desk')) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", req.headers.origin); // 为了安全，可指定域名白名单，此处为所有域名都可访问，配置多个域名白名单不可直接写数组，要判断条件后赋值单个域名
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next()
  } else {
    next()
  }
})


// 前台接口
app.use('/desk', deskLoginRouter)
app.use("/desk/index", deskIndexRouter)




// 渲染模板引擎  后台
app.use('/login', loginRouter);
app.use("*", function (req, res, next) {
  if (req.cookies.user === null || req.cookies.user === undefined) {
    res.redirect("/login")
  } else {
    next()
  }
})
app.use('/', indexRouter);

app.use("*", function (req, res, next) {
  let apifalg = tablist.some(item => {
    return req.originalUrl === item.url
  })
  if (apifalg) {
    if (req.method.toLowerCase() === "get") {
      let falg = tablist.some((item, index) => {
        return req.cookies.user.role >= item.role && req.originalUrl === item.url
      })
      if (falg) {
        next()
      } else {
        res.redirect("/")
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
app.use('/users', usersRouter);
app.use('/banner', bannerRouter);
app.use("/cart", cartRouter);
app.use("/cotegory", cotegoryRouter)
app.use("/goods", goodsRouter);
app.use("/order", orderRouter);
app.use("/set", setRouter)
app.use("/admin", adminRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;