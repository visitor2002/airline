var mongoose = require('mongoose');

mongoose.connect('mongodb://flights:123456@ds227459.mlab.com:27459/flights');

module.exports = mongoose.connection;