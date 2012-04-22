
/*
 * GET home page.
 */

var http = require('http');

exports.index = function(req, res){
  res.render('index', { title: 'Voter Control', district: 'Stone Mountain' })
};

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
	
	console.log(req.params.bioguideid);
	
	var service_req = http.get(options, function(service_res) {
	    var pageData = "";
	    service_res.setEncoding('utf8');
	    service_res.on('data', function (chunk) {
	      pageData += chunk;
	    });

	    service_res.on('end', function(){
		var jsObject = JSON.parse(pageData);
		var matches = {};
		matches.bills = [];
		console.log(jsObject.count);
		console.log(jsObject.bills.length);
		
		for(var i=0; i<jsObject.bills.length; i++)
		{
			for(var j=0; j<jsObject.bills[i].cosponsors.length; j++)
			{
				// console.log(jsObject.bills[i].cosponsors[j].bioguide_id);
				if (jsObject.bills[i].cosponsors[j].bioguide_id == String(req.params.bioguideid))
				{
					console.log("MATCH");
					console.log(jsObject.bills[i].bill_id);
					matches.bills.push(jsObject.bills[i]);
				}
			}
		}
		var matchesText = JSON.stringify(matches);
	      res.send(matchesText)
	    });
	  });
}

exports.votes = function(req, res) {
	var options = {
		host: 'api.realtimecongress.org',
		port:80,
		path:'/api/v1/votes.json?apikey=5a7ac9d9396c4c03adb5e9519b7605fb'
	};
	console.log(req.params.bioguideid);
	
	var service_req = http.get(options, function(service_res) {
		var pageData = "";
	    service_res.setEncoding('utf8');
	    service_res.on('data', function (chunk) {
	      pageData += chunk;
	    });
	    
	    service_res.on('end', function () {
	    	var jsObject = JSON.parse(pageData);
	 	   	for(var x=0; x < jsObject.votes.length;x++){
	    		if(jsObject.votes[x].voter_ids != undefined)
	    		{
	    			if( eval("jsObject.votes[x].voter_ids."+req.params.bioguideid) != undefined)
	    				console.log('Vote question:'+jsObject.votes[x].question);
	    		}
/*
	    		if( eval("jsObject.votes[x].voter_ids."+req.params.bioguideid) != undefined)
	    			console.log('Vote number:'+jsObject.votes[x].votenumber);		
*/
	    	}  
	    	res.send('done');
	    });
	    
		
	});
	
}
exports.musa = function(req, res) {}

exports.amendments = function(req, res) {
var options = {
	  host: 'api.realtimecongress.org',
	  port: 80,
	  path: '/api/v1/amendments.json?apikey=5a7ac9d9396c4c03adb5e9519b7605fb'
	};
	
	console.log(req.params.bioguideid);
	
	var service_req = http.get(options, function(service_res) {
	    var pageData = "";
	    service_res.setEncoding('utf8');
	    service_res.on('data', function (chunk) {
	      pageData += chunk;
	    });

	    service_res.on('end', function(){
		var jsObject = JSON.parse(pageData);
		console.log(jsObject.count);
		console.log(jsObject.amendments.length);		
		
	      res.send(pageData)
	    });
	  });
}
