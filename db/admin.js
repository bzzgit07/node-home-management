var mongoose = require('./db');

var AdminSchema = new mongoose.Schema({
    user: String,
    pass: String,
    role: Number,
    job: String,
    head: String
})
module.exports = mongoose.model('Admin', AdminSchema, 'admin')