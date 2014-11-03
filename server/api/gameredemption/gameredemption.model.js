'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    redemptioncode  : String,
    usedstatus      : String,
    firstname       : String,
    timestamp       : String,
    lastname        : String,
    browser         : String,
    userip          : String,
    email           : String
});

mongoose.model('gameredemption', schema);