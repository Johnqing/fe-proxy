var url = require('url');
var dns = require("dns");
var request = require("request");
module.exports = function (req, res, cb) {
	dns.resolve4(req.headers.host, function(err, addresses){
		if(err){
			res.writeHeader(200, 'text/html');
			res.write(req.url);
			res.end(err);
			return cb(err);
		}
		var ip = addresses[0];
		var p = 'http://' + ip + req.url;
		req.headers['Host'] = req.headers.host;
		request({
			method:req.method,
			url:p,
			headers:req.headers
		}).pipe(res);
		cb(null, req, res);
	});
};