var express = require('express');
var MinoDB = require('minodb');
var MinoVal = require('minoval');
var mino = new MinoDB({
    db_address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/mino-example'
}, "my_app");
require('./initial_data')(mino);
express()
	.use(require('body-parser')())
	.use(express.static('./public'))
	.use('/mino/', mino.server())
	.get("/get_events", function(req, res) {
		mino.api.call({"username":"my_app"},{
		    "function": "search",
		    "parameters": {
		        "paths": ["/my_app/events/"]
		    }
		}, function(req, response) {
			res.json(response);
		});
	}).listen(process.env.PORT || 5002)