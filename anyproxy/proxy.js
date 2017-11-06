//anyproxy --rule ./rule.js

var http = require('http');
var AnyProxy = require('anyproxy');
var _host = 'whispering-plains-65196.herokuapp.com';
var _port = '80';

_host = 'localhost';
_port = '8090';

var rule = {
    summary: 'modify response',
    * beforeSendRequest(requestDetail, responseDetail) {
        return {
            protocol: 'http',
            requestOptions: {
                hostname: _host,
                port: _port,
                path: '/',
                method: 'POST',
                headers: {
                    'Host': _host,
                    'Proxy-Connection': 'keep-alive',
                    'Content-Length': '348',
                    'Accept': 'text/plain, */*; q=0.01',
                    'Origin': 'http://' + _host,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
                }
            },
            requestData: JSON.stringify({
                requestOptions: requestDetail.requestOptions,
                requestData: requestDetail.requestData.toString(),
                protocol: requestDetail.protocol
            })
        };
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
    dangerouslyIgnoreUnauthorized: false,
    silent: false
});

proxyServer.start();