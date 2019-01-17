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
module.exports = router;
