'use strict';

var express = require('express');
var router = express.Router();
var Album = require('../models/album');

router.route('/')
.get((req, res) => {
  console.log('get albums');
  Album.find({}, res.handle);
})
.post((req, res) => {
  console.log('create albums');
  Album.newAlbum(req.body, res.handle);
})
.delete((req, res) => {
  Album.remove({}, res.handle);
});

router.route('/:id')
.get((req, res) => {
  console.log('get THIS album');
  Album.findById({_id : req.params.id}, res.handle);
})
.delete((req, res) => {
  console.log('delete Albums');
  Album.findByIdAndRemove({_id : req.params.id}, (err) => {
    res.status(err ? 400 : 200).send(err || { SUCCESS : `${req.params.id} Deleted!`});
  });
})
.put((req, res) => {
  console.log('Edit this album');
  Album.findById({_id: req.params.id}, (err, dbAlbum) => {
    var newInfo = { dbAlbum, editInfo : req.body};

    Album.updateAlbum(newInfo, (err, savedAlbum) => {
      res.status(err ? 400: 200).send(err || {SUCCESS : `Updated!`, savedAlbum});
    });
  });
});

router.put('/:image/collect/:album', (req, res) => {
  Album.insertDbImg(req.params.image, req.params.album, res.handle);
});

router.delete('/:image/remove/:album', (req, res) => {
  Album.removeDbImg(req.params.image, req.params.album, res.handle);
});


module.exports = router;
