var proxy = require('./index.js');

proxy({
    port: 80,
	rules: [
		{
			r: /\/js\//,
			d: './test/****'
		}
	]
});
