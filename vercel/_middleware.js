export default async function middleware(req) {
    const headers = req.headers;
    let origin = headers['proxy_wgu_origin'];
    if (!origin) {
        return new Response("hello");
    }
    const url = new URL(origin);
    headers.host = url.host;
    return await fetch(origin, {
        method: req.method, // *GET, POST, PUT, DELETE, etc.
        headers,
        body: req.body
    });
}


// import { NextResponse } from 'next/server';
// export default async function middleware(request) {
//     const url = new URL(request.url.replace('v.u2000.icu/', ''));
//     const _response = await fetch(url.toString(), request);
//     if (_response.headers.get('content-type').indexOf('text') !== -1) {
//         let txt = await _response.text();
//         //txt =  txt.replace('https://mmbiz.qpic.cn/', 'https://w1.legu2009.workers.dev/mmbiz.qpic.cn/');
//         return new NextResponse(txt.replace('style="visibility: hidden;"', '').replaceAll('data-src="https://mmbiz.qpic.cn/', 'src="https://mmbiz.qpic.cn/'), _response);
//     }
//     return _response
// }