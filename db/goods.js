var mongoose = require('./db');

var GoodsSchema = new mongoose.Schema({
    name: String,
    banner: Array,
    desc: String,
    price: Number,
    inventory: Number,
    content: String,
    category_id: mongoose.Types.ObjectId
})
module.exports = mongoose.model('Goods', GoodsSchema, 'goods')