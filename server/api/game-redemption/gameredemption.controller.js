'use strict';

var redemption = require('./gameredemption.model');

var gamebundle = {

	// configure gamebundle server
	options : function(){
		return{
			// no default
			headers: '',
			// default port
			port: 9001,
			// default post
			method: 'POST',
			// default host
			host: 'localhost',
			// no default
			path: ''
		};
	 },

	headers: function(contentlength){
		return{
			'Content-Type': 'application/json', 
			'Content-Length': contentlength
		}
	 },

	post : {

		redemption : function(redemptionkey, callback){

			var data = JSON.stringify(redemptionkey);

			// create http.request options
			var options = gamebundle.options({
				
				// set http.request headers
				headers: gamebundle.headers(data.length),

				// set http.request path
				path: '/api/game-bundle/redemption'
			});

			var httpreq = http.request(options, function (response) {

				response.setEncoding('utf8');

				var responseString = '';

				response.on('data', function (chunk) {
					responseString = chunk;
				});

				response.on('end', function() {
					callback( 
						JSON.parse(responseString).err, 
						JSON.parse(responseString).result
					);
				})
			});

			httpreq.write(data);
			httpreq.end();	

		}
	 }

};




exports.submit = function(req, res) {

	redemption.findOne({  redemptionkey : req.body.redemptionkey }, function(err, found){

        // handle error
        if(err) return handleError(res,err);

        // handle found
        if(found) return handleError(res,{message: ' duplicate entry found'});

        // post data to gamebundle, expect result to be true | false
        gamebundle.post.redemption(req.body.redemption, function(err, result){

        	// handle error
        	if(err) return handleError(res,{message: ' error'});

        	// handle not found
        	if (!result) return handleError(res,{message: ' could not find gametitles'});

        	// handle sucess
        	var redemption_created = parse_form_redemption(req.body);
        	redemption.create(redemption_created, function(err, doc){

				return err ? handleError(res,err) : res.json(201, { // handle err, else handle success
					redemption : redemption_created // return successful data from gamebundle
				});
        	});

        });

	});

};

function handleError(res, err) {
  return res.send(500, err);
}

// returns a redemption entry
function parse_form_redemption(req){
	var save = req.body;
	// assign security data
	save.timestamp = Date.now();
	save.browser = req.headers['user-agent'];
	save.body.remoteAddress = req.connection.remoteAddress;
	return save;
}