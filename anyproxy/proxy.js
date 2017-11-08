//anyproxy --rule ./rule.js

var http = require('http');
var AnyProxy = require('anyproxy');



var _protocol = 'http';
var _host = 'localhost';
var _port = '8090';


var rule = {
    summary: 'modify response',
    dealProxyOptions(requestDetail) {
        var requestOptions = requestDetail.requestOptions;
        var origin = {
            hostname: requestOptions.hostname,
            port: requestOptions.port,
            protocol: requestDetail.protocol
        }
        requestOptions.hostname = requestOptions.headers.Host = _host;
        requestOptions.port = _port;
        requestOptions.headers['proxy_wgu_origin'] = JSON.stringify(origin);
        return {
            protocol: _protocol,
            requestOptions
        }
    },
};

proxyServer = new AnyProxy.ProxyServer({
    type: 'http',
    port: 8001,
    rule: rule,
    webInterface: {
        enable: false
    },
    forceProxyHttps: true, //是否强制拦截所有的https
    dangerouslyIgnoreUnauthorized: true,
    silent: true
});

proxyServer.start();