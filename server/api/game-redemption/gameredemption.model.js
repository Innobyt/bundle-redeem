'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gameredemption = new Schema({
    redemptionkey  	: String,
    usedstatus      : String,
	gametitle		: String,
    firstname       : String,
    timestamp       : String,
    lastname        : String,
    browser         : String,
    userip          : String,
    email           : String
});

module.exports = mongoose.model('gameredemption', gameredemption);