var fs = require('fs');

var mime = {
	"html" : "text/html",
	"css"  : "text/css",
	"js"   : "text/javascript",
	"json" : "application/json",
	"ico"  : "image/x-icon",
	"gif"  : "image/gif",
	"jpeg" : "image/jpeg",
	"jpg"  : "image/jpeg",
	"png"  : "image/png",
	"pdf"  : "application/pdf",
	"svg"  : "image/svg+xml",
	"swf"  : "application/x-shockwave-flash",
	"tiff" : "image/tiff",
	"txt"  : "text/plain",
	"wav"  : "audio/x-wav",
	"wma"  : "audio/x-ms-wma",
	"wmv"  : "video/x-ms-wmv",
	"xml"  : "text/xml"
};
var replaceStatic = function(result, res, cb){
	var header = {
		'Cache-Control' : 'max-age=0',
		'Content-Type' : 'text/plain'
	};
	var fileStr, ext;

	var socurce = result.socurce;
	socurce = socurce.replace(/(\?)\w+\=.*/, '');
	var target = result.target;


	var targetArr = target.split('/');
	if(targetArr[targetArr.length-1] == '****'){
		target = target.substring(0, target.length - 4);
		target += socurce;
	}

	try{
		fileStr = fs.readFileSync(target);
		ext = target.split('.');
		ext = ext[ext.length - 1];
		header['Content-Type'] = mime[ext];
	} catch (err){
		fileStr = socurce;
		console.log(err);
	}

	res.writeHead(200, header);

	res.write(fileStr || '');
	res.end();

	console.log('proxy file ' + socurce);
};

module.exports = replaceStatic;