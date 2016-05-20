'use strict';

var express = require('express');
var router = express.Router();
var Album = require('../models/album');

router.route('/')
.get((req, res) => {
  Album.find({}, res.handle);
});

module.exports = router;
