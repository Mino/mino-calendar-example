var logger = require('tracer').console();
var express = require('express');

var username = process.env.MINO_USERNAME || "my_app";
require('./mino_setup')(function(mino,minoval){
	express()
	.use(require('errorhandler')())
	.use(require('body-parser')())
	.use(express.static('./public'))
	.use('/mino/', mino.server())
	.post("/create_event", function(req, res) {
		minoval.validate("event", req.body, function(err, validator) {
			var error = validator.end();
			if (error) {
				return res.json(error);
			}

			var objects = [{
                name: req.body.title,
                path: "/" + username + "/events/",
                event: req.body
            }]

			mino.save(objects, function(err,response){
			    res.json(response);
			})
		});
	})
	.get("/get_events", function(req, res) {
		mino.search(["/" + username + "/events/"], function(req, response) {
			res.json(response);
		});
	})
	.listen(process.env.PORT || 5002);
});