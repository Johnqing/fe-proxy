var url = require('url');
var async = require('async');

var http = require('http');

var reply = require('./lib/reply');
var replaceStatic = require('./lib/replaceStatic');
/**
 *
 * @param option
 * {
 *      ssl: true|false,
 *      port: 143|80
 *      rules: [{
 *          r: 'src',
 *          d: 'build'
 *      }]
 * }
 */
var proxy = function(option){

    function start(cb){
        http.createServer(function(req, res){
            cb(null, req, res);
        }).listen(option.port || 80);
        console.log("Server has started.port:" + option.port);
    }

	/**
	 * 替换规则模块
	 * @param rules
	 * @param href
	 * @returns {*}
	 */
	var regxRules = function(rules, href){
		for(var i = 0, len=rules.length; i<len; i++){
			var r = rules[i].r;
			var d = rules[i].d;
			// 正则的情况直接返回替换规则
			if(r instanceof RegExp && r.test(href))
				return d;

			if(href.indexOf(r) !== -1)
				return d;
		}
		return false;
	};

	/**
	 * 替换
	 * @param req
	 * @param res
	 */
	var replaceRule = function(req, res, cb){
		var href = url.parse(req.url).href;
        console.log('Path: ' + href);
		var rules = option.rules;
		cb(null, regxRules(rules, href), req, res);
	};

	var middle = function(dest, req, res, cb){
        console.log('start replace');
		if(dest){
			replaceStatic(dest, res, cb);
			return;
		}
		reply(req, res, http, option, cb);
	};


    var end = function(){

    }
	async.waterfall([start, replaceRule, middle, end]);
};
module.exports = proxy;