'use strict';

var mongoose = require('mongoose');
var Album = require('../models/album');
var moment = require('moment');
var ObjectId = mongoose.Schema.Types.ObjectId;


var imageSchema = new mongoose.Schema({
  _imageUrl : {type : String},
  _createAt : {type : Date},
  _desc     : {type : String},
  _albums   : [{type: ObjectId, ref: 'Album'}]
});

imageSchema.statics.newImage = (imgObj, cb) => {
  Image.create(imgObj, cb);
};

imageSchema.statics.updateImage = (newInfo, cb) => {
  if(!newInfo.dbImg._id || !newInfo.editInfo) return cb({ERROR : 'Cannot Find Img for Update'});
  // Album.findById({_id: })
  //
  // var newAlbumArr = dbImg._albums.push(dbAlbum.id)
  // var setImage = {
  //   _imageUrl : newIinfo.editInfo.imageUrl,
  //   _createAt : newInfo.editInfo.moment().format('lll'),
  //   _desc     : newInfo. editInfo.desc,
  //   _albums   : newAlbumArr
  // }

  Image.findOneAndUpdate({_id: newInfo.dbImg._id}, {$set : {_desc : `${newInfo.editInfo.desc}`}}, (err, unsavedDoc) => {
    if(!unsavedDoc || err) return cb({ERROR : 'Cannot Update Image'} || err);

    Image.findById({_id: unsavedDoc._id}, (err, savedDoc) => {
      if(!savedDoc || err) return cb({ERROR : 'Cannot Update Image'} || err);
      cb(null, savedDoc);
    });
  });
};

imageSchema.statics.addToAlbum = (imageId, albumId, cb) => {
  if(!imageId || !albumId) return cb({ERROR : 'Must provide BOTH ids'});

  Image.findById({_id : imageId}, (errImage, dbImage) => {
    if(!dbImage || errImage) return cb({ERROR: 'Cannot find Image'} || errImage);
    Album.findById({_id : albumId}, (errAlbum, dbAlbum) => {
      if(!dbAlbum || errAlbum) return cb({ERROR: 'Cannot find Album'} || errAlbum);

      var imageAlbum = dbAlbum._images.indexOf(dbImage._id) != -1;
      var albumImg  = dbImage._albums.indexOf(dbAlbum._id) != -1;

      if(imageAlbum || albumImg) return cb({ERROR: 'Image is already inside Album'} || {ERROR: 'Album already has Image'});

      dbAlbum._images.unshift(dbImage._id);
      dbImage._albums.unshift(dbAlbum._id);

      dbImage.save(errImage => {
        dbAlbum.save(errAlbum => {
          cb( errImage || errAlbum);
        });
      });

      Image.findById({_id : imageId}, (err, savedImage) => {
        if(err){
          return cb(err);
        } else {
          cb(savedImage);
        };
      });
    });
  });
};

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;
