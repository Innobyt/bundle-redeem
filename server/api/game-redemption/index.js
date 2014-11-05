'use strict';

var express = require('express');
var controller = require('./gameredemption.controller');

var router = express.Router();

router.post('/', controller.submit);

module.exports = router;