'use strict';

var mongoose = require('mongoose');
var Image = require('./image');
var ObjectId = mongoose.Schema.Types.ObjectId;

var albumSchema = new mongoose.Schema({
  name    : {type : String},
  images  : [{type : ObjectId, ref : 'Image'}]
});

var Album = mongoose.model('Album', albumSchema);
module.exports = Album;
