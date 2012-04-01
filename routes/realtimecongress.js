var http = require('http');

exports.realtimecongress = function(req, res) {
	var options = {
	  host: 'api.realtimecongress.org',
	  port: 80,
	  path: '/api/v1/bills.json?apikey=5a7ac9d9396c4c03adb5e9519b7605fb'
	};

	// http.get(options, function(service_res) {
	//   console.log("Got response: " + service_res.statusCode);
	// res.render('index', { title: 'Service response', district: service_res.headers})
	// }).on('error', function(e) {
	//   console.log("Got error: " + e.message);
	// });
	
	var req = http.get(options, function(service_res) {
	    var pageData = "";
	    service_res.setEncoding('utf8');
	    service_res.on('data', function (chunk) {
	      pageData += chunk;
	    });

	    service_res.on('end', function(){
	      res.send(pageData)
	    });
	  });
};