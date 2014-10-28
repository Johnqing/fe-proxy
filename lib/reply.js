var url = require('url');
var request = require('request');
module.exports = function (req, res, http, options) {
	var urlObj = url.parse(req.url);

	urlObj.method = req.method;
	urlObj.headers = req.headers;
	urlObj.port = options.port || 80;

	if(options.refresh) {
		urlObj.headers['If-Modified-Since'] = 'Thu, 16 Aug 1970 00:00:00 GMT';
		urlObj.headers['Cache-Control'] = 'max-age=0';
	}


};