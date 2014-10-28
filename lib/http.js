var http = require('http');
var https = require('https');
module.exports = function(fn, options){
	var port = options.port || 80;
	var protocol = options.ssl ? https : http;
	protocol.createServer(fn).listen(port);
	return protocol;
};