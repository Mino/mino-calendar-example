var logger = require('tracer').console();

module.exports = function(mino, minoval, done){

	mino.save_type({
        "name" : "event",
        "display_name" : "Event",
        "type" : "object",
        "fields" : [ 
            {
                "name" : "title",
                "display_name" : "Title",
                "type" : "text",
                "min_length" : 2,
                "max_length" : null
            }, 
            {
                "name" : "allDay",
                "display_name" : "All day",
                "type" : "boolean"
            }, 
            {
                "name" : "start",
                "display_name" : "Start time",
                "type" : "text",
                "min_length" : null,
                "max_length" : null
            }, 
            {
                "name" : "end",
                "display_name" : "End time",
                "type" : "text",
                "min_length" : null,
                "max_length" : null
            }
        ]
    }, function(err, res){
		logger.log(JSON.stringify(err,null,4), res);

		minoval.save_endpoint({
		    "name" : "event",
		    "mino_type" : {
		        "name" : "event",
		        "display_name" : "Event",
		        "type" : "minoval_field",
		        "minoval_field" : "event"
		    }
		}, function(err, res){
			logger.log(JSON.stringify(err,null,4), res);

			mino.save([{
				"name": "events",
				"folder": true,
				"path": "/my_app/"
			}], function(err, res){
				logger.log(JSON.stringify(err,null,4), res);

				mino.save([{
					"name": "demo_event",
					"path": "/my_app/events/",
					"event": {
						"title": "MinoVal EVENT",
						"allDay": true,
						"start": "2014-12-20",
						"end": "2014-12-24"
					}
				}], function(err, res){
					logger.log(JSON.stringify(err,null,4), res);

					if(done) done();
				});
			});
		});
	});
}