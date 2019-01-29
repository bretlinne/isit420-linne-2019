var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/order-list', function(req, res) {
  var db = req.db;
  var collection = db.get('orderCollection');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

router.post('/add-order', function(req,res){
  var db = req.db;
  var collection = db.get('orderCollection');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

module.exports = router;
