'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    redemptioncode  : type: String,
    usedstatus      : type: String,
    firstname       : type: String,
    timestamp       : type: String,
    lastname        : type: String,
    browser         : type: String,
    userip          : type: String,
    email           : type: String
    }
});

mongoose.model('gameredemption', schema);