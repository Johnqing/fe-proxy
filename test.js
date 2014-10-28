var proxy = require('./index.js');

proxy({
	rules: [
		{
			r: /\/build\/*/g,
			d: './src/'
		}
	]
});