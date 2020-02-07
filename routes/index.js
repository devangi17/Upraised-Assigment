var mysql = require('mysql');
var express = require('express')
var router = express.Router();
var multer = require('multer');
var path = require('path')
var upload = multer();
let ps = require('python-shell');


var bodyParser = require('body-parser');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'qwertyuiop17=',
	database: 'upraised',
	multipleStatements: 'true'
});

router.get('/', function(req, res){
	connection.connect(function(err){
		if(err) throw err;
		console.log("Connected");
	})
   res.render('layout');
   console.log('Index.js is active');
});



var dataString= '';
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload.array()); 

router.get('/search_using_skillset',function(req,res){
	res.render('search_using_skillset');
})
router.get('/search',function(req,res){
	res.render('search');
})

ps.PythonShell.run('C:/Users/Devangi/Upraised Assisgnment/routes/skill_count.py', null, function (err,results) {
  if (err) throw err;
  dataString = results;
});

router.get('/search_active_jobs', function(req,res){
	var detail_list =[];
	connection.query("Select title, COUNT(*) from crawled_jobs where flag_jobs ='1' group by created_date ; Select title, COUNT(*) from crawled_jobs where flag_jobs ='1' group by title; Select company, COUNT(*) from crawled_jobs where flag_jobs ='1' group by company;",
	 function(err, results, fields){
		if (err) throw err;

		var results= JSON.stringify(results);
			res.render('search_active_jobs',{
				jobs: results,
				counter: dataString
		});
		
});

});

router.get('/search', function(req, res){
	var skill = req.body.skillset;
	console.log("Passed value:", skill)
	console.log(skill);
		connection.query("Select * from crawled_jobs where flag_jobs ='1'and (u_description like '%"+skill+"%' or  title like '%"+skill+"%');",
		function(err, rows, results, fields){
			if(err) throw err;
			var item_list= []
			for(var i =0; i< rows.length; i++){
				var item = {
					'title': rows[i].title,
					'description': rows[i].u_description,
					'company': rows[i].company,
					'date_of_creation': rows[i].created_date
				}
			item_list.push(item);
			}
			res.render('search', {
				item_list: item_list
			});
		});
});

router.post('/search', function(req, res){
	var skill = req.body.skillset;
	console.log("Passed value:", skill)
	console.log(skill);
		connection.query("Select * from crawled_jobs where  flag_jobs ='1'and (u_description like '%"+skill+"%' or  title like '%"+skill+"%');",
		function(err, rows, results, fields){
			if(err) throw err;
			var item_list= []

			for(var i =0; i< rows.length; i++){
				var item = {
					'title': rows[i].title,
					'description': rows[i].u_description,
					'company': rows[i].company,
					'date_of_creation': rows[i].created_date
				}
			item_list.push(item);
			}
			res.render('search', {
				item_list: item_list
			});
		});
});


module.exports = router;
