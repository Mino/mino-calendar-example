var logger = require('tracer').console();
var MinoDB = require('minodb');
var MinoVal = require('minoval');
var StaticSignal = MinoDB.StaticSignal;
var request = require('request');

module.exports = function(callback){

	var minoval = new MinoVal({
		user: "my_app"
	});

	var mino = new MinoDB({
	    ui: true,
	    db_address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/mino-example'
	}, "my_app")

	mino.create_user({
		"username": "my_app",
		"email": "marcus+test@minocloud.com",
		"password": "my_password"
	}, function(err, res){

		mino.add_plugin(minoval, function(){
			require('./initial_data')(mino, minoval, function(){
				
				var signal = new StaticSignal({
					paths: ["/my_app/events/"],
					include_subfolders: false,
					handlers: ["save"],
					callback: function(object) {
						request({
							url: "https://zapier.com/hooks/catch/ojbczj/",
							method: "POST",
							body: object,
							json: true
						}, function(err, httpResponse, body) {
							logger.log(err, body);
						})
					}
				})
				mino.signal_manager.add_static_signal(signal);

				callback(mino,minoval);
			});
		});

	});
};