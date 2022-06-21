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