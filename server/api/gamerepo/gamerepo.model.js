'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    threshold   : type: Number,
    gamename    : type: String,
    gamekeys    : [Object]
});

mongoose.model('gamerepo', schema);