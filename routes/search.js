var express = require('express');
var router = express.Router();



router.get('/search', function(req, res){
	var skill = req.query.skill;
	console.log("Passed value:", skill)
	console.log(skill);
		connection.query("Select * from crawled_jobs LIMIT 2;",
		function(err, rows, results, fields){
			if(err) throw err;
			var item_list= []
			console.log(item_list);
			console.log(rows);
			for(var i =0; i< rows.length; i++){
				var item = {
					'title': rows[i].title,
					'description': rows[i].u_description,
					'company': rows[i].company,
					'date_of_creation': rows[i].created_date
				}
			item_list.push(item);
			console.log(item_list);
			console.log("Pushed");
			}
			res.render('search', {
				item_list: item_list
			});
		});
});
module.exports = router;