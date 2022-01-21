var mongoose = require('./db');

var UserSchema = new mongoose.Schema({
    nickName: String,
    language: String,
    city: String,
    province: String,
    country: String,
    avatarUrl: String,
    openid: String,
    session_key: String
})
module.exports = mongoose.model('User', UserSchema, 'user')