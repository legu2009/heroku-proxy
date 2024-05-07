var http = require("http");
var AnyProxy = require("anyproxy");

const hosts = [
    //"https://v.u2000.icu",
    //"https://legu2009-gitpodnode-2z0lleh7h97.ws-us89b.gitpod.io",
    "https://3000-legu2009-gitpodnode-2z0lleh7h97.ws-us90.gitpod.io",
     //"https://a.legu2022.repl.co",
     //"https://b.legu2022.repl.co",
    //"https://d.legu2022.repl.co",
    //"https://s.legu2022.repl.co",
    //"https://e.legu2022.repl.co",
    //"https://f.legu2022.repl.co",
    //"https://l.legu2022.repl.co",
    //"https://v.u2000.icu",
    // "https://legu2009.repl.co",
    // "https://legu2010.legu2009.repl.co",
    // "https://legu2011.legu2009.repl.co",
    // "https://1342369464.quincewang.repl.co",
    // "https://13423694641.quincewang.repl.co",
    // "https://1342369464-1.quincewang.repl.co",
];
var index = 0;

const rule = {
    summary: "modify response",
    *beforeSendRequest(requestDetail) {
        // const requestOptions = requestDetail.requestOptions;
        // const { hostname, protocol } = requestOptions;
        // if (hostname.indexOf("replit") !== -1) {
        //     return {
        //         protocol,
        //         requestOptions,
        //     };
        // }
        // let proxyUrl = hosts[index++ % hosts.length];
        // // if (requestDetail.url.indexOf(".openai.") !== -1) {
        // //     proxyUrl = "https://legu2009.repl.co";
        // // }
        // const url = new URL(proxyUrl);
        // requestOptions.hostname = url.hostname;
        // requestOptions.headers.Host = url.host;
        // requestOptions.port = url.port;
        // requestOptions.headers["proxy_wgu_origin"] = requestDetail.url;
        // if (proxyUrl.indexOf('.gitpod.io') !== -1) {
        //     //requestOptions.headers.Cookie += '';
        //     requestOptions.headers.Cookie += '_gitpod_io_ws_f209fe03-6945-4183-b6b9-3d19e7191e44_owner_=EDIoTv_f9tjuTHBOaQhJBQTSqBtLJrUP';
        // }
        // requestOptions.path = url.pathname;
        // if (url.pathname !== '/') {
        //     requestOptions.headers["proxy_wgu_method"] = requestOptions.method;
        //     requestOptions.method = 'POST';
        // }
        // return {
        //     protocol: url.protocol,
        //     requestOptions,
        // };
    },
};

const proxyServer = new AnyProxy.ProxyServer({
    type: "http",
    port: 8001,
    rule: rule,
    webInterface: {
        enable: true,
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
