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
                "type" : "date",
                "format": "yyyy-MM-dd"
            }, 
            {
                "name" : "end",
                "display_name" : "End time",
                "type" : "date",
                "format": "yyyy-MM-dd"
            }
        ]
    }, function(err, res){
		logger.log(JSON.stringify(err,null,4), res);

		minoval.save_rule({
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

				var start = new Date();
				var end = new Date();
				end.setDate(end.getDate() + 4);

				mino.save([{
					"name": "demo_event",
					"path": "/my_app/events/",
					"event": {
						"title": "MinoDB Calendar example event",
						"allDay": true,
						"start": start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate(),
						"end": end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate()
					}
				}], function(err, res){
					logger.log(JSON.stringify(err,null,4), res);

					if(done) done();
				});
			});
		});
	});
}