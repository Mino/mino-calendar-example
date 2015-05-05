var logger = require('tracer').console();

module.exports = function(mino, minoval, done){
	var username = process.env.MINO_USERNAME || "my_app";

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

		minoval.save_rule({
		    "name" : "event",
		    "minodb_type" : {
		        "name" : "event",
		        "display_name" : "Event",
		        "type" : "minodb_field",
		        "minodb_field" : "event"
		    }
		}, function(err, res){

			mino.save([{
				"name": "events",
				"folder": true,
				"path": "/" + username + "/"
			}], function(err, res){

				var start = new Date();
				var end = new Date();
				end.setDate(end.getDate() + 4);

				var format_number = function(k) {
					return k<10? ("0"+k) : ""+k;
				};

				var event_start = start.getFullYear() + "-" + format_number(start.getMonth()+1) + "-" + format_number(start.getDate());
				var event_end = end.getFullYear() + "-" + format_number(end.getMonth()+1) + "-" + format_number(end.getDate());

				mino.save([{
					"name": "demo_event",
					"path": "/" + username + "/events/",
					"event": {
						"title": "MinoDB Calendar example event",
						"allDay": true,
						"start": event_start,
						"end": event_end
					}
				}], function(err, res){
					if(done) done();
				});
			});
		});
	});
};