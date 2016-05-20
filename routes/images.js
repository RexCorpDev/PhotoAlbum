'use strict';

var express = require('express');
var router = express.Router();
var Image = require('../models/image');

router.route('/')
.get((req, res) => {
  Image.find({}, res.handle);
})
.post((req, res) => {
  console.log(req.body);
  Image.newImage(req.body, res.handle);
})
.delete((req, res) => {
  Image.remove({}, res.handle);
});

router.route('/:id')
.get((req, res) => {
  Image.findById({_id : req.params.id}, res.handle);
})
.delete((req, res) => {
  Image.findByIdAndRemove({_id : req.params.id}, (err) => {
    console.log('delete THIS img');
    res.status(err ? 400 : 200).send(err || {SUCCESS : `${req.params.id} Deleted!`});
  });
})
.put((req, res) => {
  console.log('edit THIS img');
  Image.findById({_id : req.params.id}, (err, dbImg) => {
    console.log('dbImg\n',dbImg);
    var newInfo = {dbImg, editInfo: req.body}

    Image.updateImage(newInfo, (err, savedImage)=> {
      res.status(err ? 400: 200).send(err || {SUCCESS : 'Updated!', savedImage});
    });
  });
});

router.put('/:image/insert/:album', (req, res) =>{
  Image.addToAlbum(req.params.image, req.params.album, res.handle);
});


module.exports = router;
