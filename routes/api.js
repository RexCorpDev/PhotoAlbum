'use strict';

var express = require('express');
var router = express.Router();

router.use('/images', require('./images'));
router.use('/albums', require('./albums'));
router.use('/users', require('./users'));

module.exports = router;
