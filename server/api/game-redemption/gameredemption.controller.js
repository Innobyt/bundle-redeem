'use strict';

var http = require('http');
var async = require('async');
var nodemailer = require('nodemailer');
var gameredemption = require('./gameredemption.model');

var email = {

	transporter : nodemailer.createTransport({

		auth: {
			user: '',
			pass: ''
		},

		service: 'Gmail'
	}),

	options : function(options){
		return{
			subject: '✔  Your Keys! Have Arrived!',
			from: '',
			text : options.text,
			to: options.to
		}
	},

	send : function(send){
		email.transporter.sendMail(email.options({
			text : send.text,
			to: send.to
		}));
	}
};

var gamebundle = {

	// configure gamebundle server
	options : function(args){
		return{
			// no default
			headers: args.headers || '',
			// default port
			port: args.port || 9001,
			// default post
			method: args.method || 'POST',
			// default host
			host: args.host || 'localhost',
			// default path, no default api
			path: '/api/game-bundle/' + args.api,
		};
	 },

	headers: function(data){
		return{
			'Content-Type': 'application/json', 
			'Content-Length': data.length
		}
	 },

	post : {

		claim : function(redemptionkey, callback){

			var data = JSON.stringify(redemptionkey);

			var options = gamebundle.options({
				headers: gamebundle.headers(data),
				api: 'claim'
			});

			var httpreq = http.request(options, function (response) {
				response.setEncoding('utf8');

				var responseString = '';

				response.on('data', function (chunk) {
					responseString = chunk;
				});

				response.on('end', function() {
					callback( 
						JSON.parse(responseString).error, 
						JSON.parse(responseString).result
					);
				})
			});

			httpreq.write(data);
			httpreq.end();
		}
	 }
};

var gamerepo = {

	// configure gamebundle server
	options : function(args){
		return{
			// no default
			headers: args.header || '',
			// default port
			port: args.port || 9000,
			// default post
			method: args.method || 'POST',
			// default host
			host: args.host || 'localhost',
			// default path, no default api
			path: '/api/game-repo/' + args.api
		};
	 },

	headers: function(data){
		return{
			'Content-Type': 'application/json', 
			'Content-Length': data.length
		}
	 },

	post : {

		claim : function(gametitle, callback){

			gametitle.check = ' check';

			var data = JSON.stringify(gametitle);

			// create http.request options
			var options = gamerepo.options({
				
				// set http.request headers
				headers: gamerepo.headers(data),

				// set http.request
				api: 'claim/' + gametitle
			});

			var httpreq = http.request(options, function (response) {

				response.setEncoding('utf8');

				var responseString = '';
				response.on('data', function (chunk) {
					responseString = chunk;
				});

				response.on('end', function() {

					// convert responseString to object
					var res = JSON.parse(responseString);

					// return
					return res.message
					// cakkback with error
					? callback(res.message, null)
					// callback with success
					: callback(null, res.result);
				});
			});

			httpreq.write(data);
			httpreq.end();	

		}
	 }
};

var AsyncLibrary = {
  each: function(query, callback){ 
    gamerepo.post.claim(query, function(err, found){
      callback(err, found);
    });
  }
};

exports.submit = function(req, res) {

	gameredemption.findOne({  redemptionkey : req.body.redemptionkey }, function(err, found){

        // handle error
        if(err) return handleError(res,err);

        // handle found
        if(found) return handleError(res,{message: ' duplicate entry found'});

        // post data to gamebundle, expect result to be true | false
        gamebundle.post.claim(req.body, function(err, gamebundle_result){

        	// handle error
        	if(err) return handleError(res,{message: ' error'});

        	// handle not found
        	if (!gamebundle_result) return handleError(res,{message: ' could not find gametitles'});

			async.map(gamebundle_result, AsyncLibrary.each.bind(AsyncLibrary), function(err, result){
				
				// handle error
				if(err) return handleError(res,{message: ' error'});

				// handle not found
				if (!result) return handleError(res,{message: ' could not find gametitles'});

	        	// save user entry
	        	var redemption_created = parse_form_redemption(req, gamebundle_result);
	        	gameredemption.create(redemption_created, function(err, doc){

	        		// send email to client
	        		if(!err){
	        			email.send({
	        				to: req.body.email,
							text: JSON.stringify(result)
	        			});
	        		}

					return err ? handleError(res,err) : res.json(201, { // handle err, else handle success
						redemption : redemption_created // return successful data from gamebundle
					});
	        	});
			});
        });
	});
};

function handleError(res, err) {
  return res.send(500, err);
}

// returns a redemption entry
function parse_form_redemption(req, array_of_gametitles){
	
	var save = req.body;

	// create a timestamp property
	save.timestamp = Date.now();

	// create a browser header property
	save.browser = req.headers['user-agent'];

	// create a remoteAddress property
	save.remoteAddress = req.connection.remoteAddress;

    // create an array of entries
    for(var i = 0, array_of_entries = []; i < array_of_gametitles.length; i++){
        array_of_entries.push( JSON.parse( JSON.stringify( save ) ) );
        array_of_entries[i].gametitle = array_of_gametitles[i];
        array_of_entries[i].usedstatus = true;
    }

	return array_of_entries;
}
