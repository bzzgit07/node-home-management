var mongoose = require('./db');

var BannerSchema = new mongoose.Schema({
    img: String,
    desc: String,
    url: String
})
module.exports = mongoose.model('Banner', BannerSchema, 'banner')