//anyproxy --rule ./rule.js

var http = require("http");
var AnyProxy = require("anyproxy");

var _protocol = "https";
//var host = []; //"w1.legu2009.workers.dev";
var _port = "443";
var hosts = [];
for (var i = 2; i < 11; i++) {
    hosts.push("w" + i + ".legu2009.workers.dev");
}

var hosts = ["https://nextjs-89415119.vercel.app"];
var index = 0;

var rule = {
    summary: "modify response",
    *beforeSendRequest(requestDetail) {
        let requestOptions = requestDetail.requestOptions;
        const { hostname, protocol } = requestOptions;
        if (hostname.indexOf("vercel") !== -1) {
            return {
                protocol,
                requestOptions,
            };
        }
        let proxyUrl = hosts[index++ % hosts.length];
        let url = new URL(proxyUrl);
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

var proxyServer = new AnyProxy.ProxyServer({
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
