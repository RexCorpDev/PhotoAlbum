'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', (req, res, next) => {
  var indexPath = path.join(__dirname, '../views/index.html');
  res.sendFile(indexPath);
});

module.exports = router;
