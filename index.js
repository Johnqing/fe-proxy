var url = require('url');
var async = require('async');

var http = require('./lib/http');
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

	var init = function(cb){
		http(cb, option);
	};
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
		var href = url.parse(req).href;
		var rules = option.rules;
		cb(regxRules(rules, href), req, res);
	};

	var middle = function(dest, req, res, cb){
		if(dest){
			replaceStatic(dest, res, cb);
			return;
		}
		reply(req, res, http, option, cb);
	};

	async.waterfall([init, replaceRule, middle]);
};
module.exports = proxy;