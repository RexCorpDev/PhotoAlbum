'use strict';

var express = require('express');
var router = express.Router();

router.route('/')
.get((req, res) => {
  res.send('all the users');
});

module.exports = router;
