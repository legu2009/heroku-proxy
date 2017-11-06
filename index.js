const http = require('http'),
    https = require('https');

http.createServer(function (req, res) {
    const rawResChunks = [];
    req.on('data', (chunk) => {
        rawResChunks.push(chunk);
    });
    req.on('end', () => {
        var config = JSON.parse(rawResChunks.join(''));
        var {
            protocol,
            requestOptions,
            requestData
        } = config;
        const proxyReq = (/https/i.test(protocol) ? https : http).request(requestOptions, proxyRes => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.on('data', (chunk) => {
                res.write(chunk);
            });
            proxyRes.on('end', () => {
                res.end();
            });
        });
        proxyReq.on('error', (error) => {
            res.end();
        });
        proxyReq.end(requestData);
    });
}).listen(process.env.PORT);