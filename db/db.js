var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mall', {
    useUnifiedTopology: true
}, function (err) {
    if (err) throw err;
    console.log("连接数据库成功")
})
module.exports = mongoose