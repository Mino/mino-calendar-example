var express = require('express');
var MinoDB = require('minodb');
var MinoVal = require('minoval');
var mino = new MinoDB({
	api: true,
    ui: true,
    db_address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/minodb'
})
express()
	.use(require('body-parser')())
	.use(express.static('./public'))
	.use('/mino/', mino.server())
	.use('/minoval/', new MinoVal(mino).endpoint_server())
	.get("/get_events", function(req, res) {
		mino.api.call({"username":"TestUser"},{
		    "function": "search",
		    "parameters": {
		        "paths": ["/TestUser/events/"]
		    }
		}, function(req, response) {
			res.json(response);
		});
	}).listen(process.env.PORT || 5002)