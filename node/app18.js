const http = require("node:http");
const https = require("node:https");

http.createServer(function (req, res) {
    const origin = req.headers["proxy_wgu_origin"];
    if (!origin) {
        res.writeHead("200", {
            "Content-Type": "text/plain",
        });
        res.end("hello");
        return;
    }
    const newUrl = new URL(origin);
    const headers = { ...req.headers };
    delete headers["proxy_wgu_origin"];
    delete headers["x-forwarded-for"];
    delete headers["x-forwarded-proto"];
    headers.host = newUrl.host;
    const proxyReq = (newUrl.protocol === "https:" ? https : http).request(newUrl.toString(), {
        method: req.method,
        headers,
    }, proxyRes => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res);
    });
    req.pipe(proxyReq);
    proxyReq.on("error", error => {
        res.end();
    });
}).listen(process.env.port || 3000);


