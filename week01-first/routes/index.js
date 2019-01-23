var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Isit420-Ass1',
  author: 'Bret Linne'});
});

router.post('/', function(req, res, next){
 // console.log(req.body.order);
  console.log("\nPOST OUTPUT:");
  console.log("*************************************************");
  console.log("* itemNumber: \t\t"+ req.body.itemNumber + "\t\t\t*");
  console.log("* timePurch: \t\t" +req.body.timePurch + "\t*");
  console.log("* storeNumber: \t\t"+req.body.storeNumber + "\t\t\t*");
  console.log("* pricePaid: \t\t"+req.body.pricePaid + "\t\t\t*");
  console.log("* salesPersonID:\t"+req.body.salesPersonID + "\t\t\t*");
  console.log("*************************************************");
  res.sendStatus(200);
  
});

module.exports = router;
