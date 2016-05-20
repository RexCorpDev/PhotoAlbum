'use strict';

var mongoose = require('mongoose');
var Image = require('./image');
var ObjectId = mongoose.Schema.Types.ObjectId;

var albumSchema = new mongoose.Schema({
  _name   : {type : String},
  _images : [{type: ObjectId, ref: 'Image'}]
});

albumSchema.statics.newAlbum = (albObj, cb) => {
  console.log('yo');
  Album.create(albObj, cb);
};

albumSchema.statics.updateAlbum = (newInfo, cb) => {
  console.log('making album updates');
  Album.findOneAndUpdate({ _id: newInfo.dbAlbum._id}, {$set : { _name : `${newInfo.editInfo.name}`}}, (err, unsavedDoc) => {
    if(err || !unsavedDoc) return cb(err || {error : 'Could not make changes to album'});

    Album.findById({_id: unsavedDoc._id}, (err, savedDoc) => {
      if(err || !savedDoc) return cb(err || {error : 'Could not edited album'});
      cb(null, savedDoc);
    });
  });
};

albumSchema.statics.insertDbImg = (imageId, albumId, cb) => {
  if(!imageId || !albumId) return cb({ERROR : 'Missing Id(s)'});

  Album.findById({_id : albumId}, (err, dbAlbum) => {
    if(!dbAlbum || err) return cb({ERROR : 'Did not find dbAlbum. Check ID'} || err);
    Image.findById({_id : imageId}, (err, dbImage) => {
      if(!dbImage || err) return cb({ERROR : 'Did not find dbImage. Check ID'} || err);

      var imageCheck = dbAlbum._images.indexOf(imageId._id) != -1;
      var albumCheck = dbImage._albums.indexOf(albumId._id) != -1;

      if(imageCheck || albumCheck) return cb({ERROR : 'That image is aready inside this Album'});

      dbAlbum.save(errAlbum => {
        dbImage.save(errImage => {
          cb(errAlbum || errImage);
        });
      });
    });
  });
};

albumSchema.statics.removeDbImg = (imageId, albumId, cb) => {
  if(!imageId || !albumId) return cb({ERROR : 'Missing Id(s)'});

  Album.findById({_id : albumId}, (err, dbAlbum) => {
    if(!dbAlbum || err) return cb({ERROR : 'Did not find dbAlbum. Check ID'} || err);

    var imgIndex = dbAlbum._images.indexOf(imageId);

    if(imgIndex < 0) return cb({ERROR : 'Image is not inside Album. Verify ID'});

    dbAlbum._images.splice(imgIndex, 1);
    dbAlbum.save(errAlbum => {
      cb(errAlbum);
    });
  });
};


var Album = mongoose.model('Album', albumSchema);
module.exports = Album;
