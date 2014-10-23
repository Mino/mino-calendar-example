var logger = require('tracer').console();
var express = require('express');
var connect = require('connect');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');

var MinoDB = require('minodb');
var db_address = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/minodb';
var mino = new MinoDB({
    api: true,
    ui: true,
    db_address: db_address
})

var server = express();
server.set('port', process.env.PORT || 5002);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade')
server.use(errorHandler());
server.use(bodyParser());
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.static(path.join(__dirname, 'bower_components')));

server.use('/mino/', mino.server())

var MinoVal = require('minoval');
var minoval = new MinoVal(mino);

server.use('/minoval/example/', minoval.example_server());
server.use('/minoval/', minoval.endpoint_server());

server.post("/create_event", function(req, res) {
	minoval.validate("event", req.body, function(validator) {
		var error = validator.end();
		if (error) {
			res.json(error);
			return;
		}

		mino.api.call({username:"TestUser"},{
		    "function": "save",
		    parameters: {
		        objects: [
		            {
                        name: req.body.event.title,
                        path: "/TestUser/events/",
                        event: req.body.event
                    }
		        ]
		    }
		},function(err,response){
		    logger.log(err, response);
		    res.json(response);
		})

	});
})


server.get("/get_events", function(req, res) {
	mino.api.call({username:"TestUser"},{
	    "function": "search",
	    parameters: {
	        paths: [
	            "/TestUser/events/"  
	        ]
	    }
	}, function(req, response) {
		logger.log(req, response);
		res.json(response);
	});
})


http.createServer(server).listen(server.get('port'), function() {
    console.log('Server started on port ' + server.get('port'));
});