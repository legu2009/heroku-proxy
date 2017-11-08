const http = require('http'),
    https = require('https');

http.createServer(function (req, res) {
    console.log(req);
    const rawResChunks = [];
    req.on('data', (chunk) => {
        rawResChunks.push(chunk);
    });
    req.on('end', () => {
        var str = rawResChunks.join('');
        if (!str) {
            res.writeHead('200', { 'Content-Type': 'text/plain' });
            res.end('hello');
            return;
        }
        var config = JSON.parse(str);
        var {
            protocol,
            requestOptions,
            requestData
        } = config;
        const proxyReq = (/https/i.test(protocol) ? https : http).request(requestOptions, proxyRes => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
        });
        proxyReq.on('error', (error) => {
            res.end();
        });
        proxyReq.end(requestData);
    });
}).listen(process.env.PORT);