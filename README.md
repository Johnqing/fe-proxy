资源文件反向代理
========

## download

```
[sudo] npm install fe-proxy [-g]
```

## HOSTS

```
127.0.0.1 需要代理的网址
```

## 调用

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

## 命令行

```
feproxy config.json
```