'use strict';

var mongoose = require('mongoose');
var Album = require('./album');
var ObjectId = mongoose.Schema.Types.ObjectId;

var imageSchema = new mongoose.Schema({
  imageUrl   : {type : String},
  createdAt  : {type : Date},
  desc       : {type : String},
  albums     : [{type : ObjectId, ref : 'Album'}]
});

imageSchema.statics.newImage = (imgObj, cb) => {
  Image.create(imgObj, cb);
};



var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
