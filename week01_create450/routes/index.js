var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'week01_create450' });
});

/*
//var router: any;
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'.index.html'));
});
*/

/* GET Userlist page */
router.get('/userlist', function(req,res){
  var db = req db;
  var collection = db.get('Usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});
module.exports = router;
