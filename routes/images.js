'use strict';

var express = require('express');
var router = express.Router();
var Image = require('../models/image');

router.route('/')
.get((req, res) => {
  Image.find({}, res.handle);
})
.post((req, res) => {
  Image.newImage(req.body, res.handle);
})
.delete((req, res) => {
  Image.remove({}, res.handle);
});








module.exports = router;
