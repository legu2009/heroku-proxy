var http = require("http");
var AnyProxy = require("anyproxy");

const hosts = [];
var index = 0;

const rule = {
    summary: "modify response",
    *beforeSendRequest(requestDetail) {
        const requestOptions = requestDetail.requestOptions;
        const { hostname, protocol } = requestOptions;
        if (hostname.indexOf("vercel") !== -1) {
            return {
                protocol,
                requestOptions,
            };
        }
        const proxyUrl = hosts[index++ % hosts.length];
        const url = new URL(proxyUrl);
        requestOptions.hostname = url.hostname;
        requestOptions.headers.Host = url.host;
        requestOptions.port = url.port;
        requestOptions.headers["proxy_wgu_origin"] = requestDetail.url;
        return {
            protocol: url.protocol,
            requestOptions,
        };
    },
};

const proxyServer = new AnyProxy.ProxyServer({
    type: "http",
    port: 8001,
    rule: rule,
    webInterface: {
        enable: false,
    },
    wsIntercept: false,
    forceProxyHttps: true, //是否强制拦截所有的https
    dangerouslyIgnoreUnauthorized: true,
    silent: true,
});

proxyServer.on("error", function (e) {
    console.log(e);
});

proxyServer.start();
