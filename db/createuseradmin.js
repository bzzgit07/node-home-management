var Admin = require('./admin');
// var md5 = require('md5-node');
const crypto = require('crypto');

const secret = 'nishishazi';
var User = new Admin({
    user: 'xiaozi',
    pass: crypto.createHmac('sha256', secret).update('123456').digest('hex'),
    role: 1,
    job: '超级管理员',
    head: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F3c899f6708c3b51e286d3c687e298e8ac450ec2a31d27-du1vPu_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639191415&t=d48f4990e44e576473cf6d5bda3d6ecd'
});

User.save(function (err, doc) {
    if (err) throw err;
    console.log(doc)
})