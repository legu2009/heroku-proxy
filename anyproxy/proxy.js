//anyproxy --rule ./rule.js

var http = require('http');
var AnyProxy = require('anyproxy');
var _protocol = 'http';
var _host = 'wgu.eu-4.evennode.com';


var _protocol = 'https';
var _host = 'wgu.herokuapp.com';
var _host = 'wgu-legu2009.c9users.io';


var _port = _protocol === 'https' ? '443' : '80';
//_protocol = 'http';
//_host = 'localhost';
//_port = '8090';

var rule = {
    summary: 'modify response',
    * beforeSendRequest(requestDetail, responseDetail) {
        if (requestDetail.requestOptions.hostname === _host) return;
        delete requestDetail.requestOptions.headers['Accept-Encoding'];
        return {
            protocol: _protocol,
            requestOptions: {
                hostname: _host,
                port: _port,
                path: '/',
                method: 'POST',
                headers: {
                    'Host': _host,
                    'Accept': 'text/plain, */*; q=0.01',
                    'Origin': _protocol + '://' + _host,
                    'Content-Type': 'application/x-www-form-urlencoded',
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
    dangerouslyIgnoreUnauthorized: true,
    silent: true
});

proxyServer.start();