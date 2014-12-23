var logger = require('tracer').console();
var express = require('express');

require('./mino_setup')(function(mino,minoval){
	express()
	.use(require('errorhandler')())
	.use(require('body-parser')())
	.use(express.static('./public'))
	.use('/mino/', mino.server())
	.post("/create_event", function(req, res) {
	
		minoval.validate("event", req.body, function(validator) {
			var error = validator.end();
			if (error) {
				res.json(error);
				return;
			}

			mino.api.call({username:"my_app"},{
			    "function": "save",
			    parameters: {
			        objects: [
			            {
	                        name: req.body.title,
	                        path: "/my_app/events/",
	                        event: req.body
	                    }
			        ]
			    }
			},function(err,response){
			    logger.log(err, response);
			    res.json(response);
			})

		});

	})
	.get("/get_events", function(req, res) {
		
		mino.api.call({username:"my_app"},{
		    "function": "search",
		    parameters: {
		        paths: [
		            "/my_app/events/"  
		        ]
		    }
		}, function(req, response) {
			logger.log(req, response);
			res.json(response);
		});

	})
	.listen(process.env.PORT || 5002);
});