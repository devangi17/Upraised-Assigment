var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');

var index 				  = require('./routes/index');
//var search_active_jobs    = require('./routes/search_active_jobs');
var search_using_skillset = require('./routes/search_using_skillset');
var search 				  = require('./routes/search'); 
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');






app.use('/', index);
app.use('/search_using_skillset', search_using_skillset);
app.use('/search',search);

app.get('/', function(req, res){
	res.render('index');
})



app.listen(8000);



