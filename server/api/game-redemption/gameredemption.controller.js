'use strict';

var redemption = require('./gameredemption.model');

exports.submit = function(req, res) {
	req.body.timestamp = Date.now();
	req.body.browser = req.headers['user-agent'];
	req.body.remoteAddress = req.connection.remoteAddress;
};


function handleError(res, err) {
  return res.send(500, err);
}