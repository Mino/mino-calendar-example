var logger = require('tracer').console();
var MinoDB = require('minodb');
var MinoVal = require('minoval');
var StaticSignal = MinoDB.StaticSignal;
var request = require('request');

module.exports = function(callback){
	var username = process.env.MINO_USERNAME || "my_app";
	var minoval = new MinoVal({
		user: username
	});

	var mino = new MinoDB({
	    ui: true,
	    db_address: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/mino-example'
	}, username)

	mino.create_user({
		"username": username,
		"email": "email@example.com",
		"password": process.env.MINO_PASSWORD || "my_password"
	}, function(err, res){
		logger.log(err, res);
		mino.add_plugin(minoval, function(){
			require('./initial_data')(mino, minoval, function(){
				callback(mino,minoval);
			});
		});

	});
};