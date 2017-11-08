const http = require('http'),
    https = require('https'),
    url = require('url');


var getHeaderFromRawHeaders = function (rawHeaders) {
    const headerObj = {};
    const _handleSetCookieHeader = function (key, value) {
        if (headerObj[key].constructor === Array) {
            headerObj[key].push(value);
        } else {
            headerObj[key] = [headerObj[key], value];
        }
    };
    if (!!rawHeaders) {
        for (let i = 0; i < rawHeaders.length; i += 2) {
            const key = rawHeaders[i];
            let value = rawHeaders[i + 1];
            if (typeof value === 'string') {
                value = value.replace(/\0+$/g, ''); // 去除 \u0000的null字符串
            }
            if (!headerObj[key]) {
                headerObj[key] = value;
            } else {
                if (key.toLowerCase() === 'set-cookie') {
                    _handleSetCookieHeader(key, value);
                } else {
                    headerObj[key] = headerObj[key] + ',' + value;
                }
            }
        }
    }
    return headerObj;
};
http.createServer(function (req, res) {

    const host = req.headers.host;
    let protocol = (!!req.connection.encrypted && !(/^http:/).test(req.url)) ? 'https' : 'http';
    const fullUrl = protocol === 'http' ? req.url : (protocol + '://' + host + req.url);

    const urlPattern = url.parse(fullUrl);
    const path = urlPattern.path;

    req.headers = getHeaderFromRawHeaders(req.rawHeaders);

    const options = {
        hostname: urlPattern.hostname || req.headers.host,
        port: urlPattern.port || req.port || (/https/.test(protocol) ? 443 : 80),
        path,
        method: req.method,
        headers: req.headers
    };
    var origin = req.headers['proxy_wgu_origin'];
    if (!origin) {
        res.writeHead('200', {
            'Content-Type': 'text/plain'
        });
        res.end('hello');
    } else {
        delete req.headers['proxy_wgu_origin'];
        origin = JSON.parse(origin);
        protocol = origin.protocol;
        options.port = origin.port;
        options.hostname = options.headers.Host = origin.hostname;
        const proxyReq = (/https/i.test(protocol) ? https : http).request(options, proxyRes => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        });
        req.pipe(proxyReq);
        proxyReq.on('error', (error) => {
            res.end();
        });
    }
}).listen(process.env.PORT || 8090);