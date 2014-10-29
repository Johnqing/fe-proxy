资源文件反向代理
========

## Use

```
var proxy = require('fe-proxy');

proxy({
    port: 80,
	rules: [
		{
			r: /\/js\//,
			d: './test/****'
		}
	]
});

```