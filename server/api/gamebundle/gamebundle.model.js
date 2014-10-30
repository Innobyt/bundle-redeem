'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    gamelist    : [String],
    redemptions : [Object],
    bundlename  : String,
    merchant    : String,
    threshold   : Number,
    count       : Number,
    generated   : Number
});

mongoose.model('gamebundle', schema);