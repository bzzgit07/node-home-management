var mongoose = require('./db');

var CotegorySchema = new mongoose.Schema({
    name: String
})
module.exports = mongoose.model('Cotegory', CotegorySchema, 'cotegory')