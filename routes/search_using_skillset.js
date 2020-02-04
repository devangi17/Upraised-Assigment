var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload.array()); 

router.post('/search', function(req, res){
	var skill = req.body.skillset;
	console.log("Received value:", skill);
	res.redirect('/search' +skill);
});

console.log("Hey")
module.exports = router;