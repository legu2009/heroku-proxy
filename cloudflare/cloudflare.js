addEventListener("fetch", (event) => {
    event.respondWith(
      handleRequest(event.request).catch(
        (err) => new Response(err.stack, { status: 500 })
      )
    );
  });
  
  
  async function handleRequest(request) {
    let origin = request.headers.get("proxy_wgu_origin")
    if (!origin) {
        return fetch("https://www.baidu.com");
    }
    return fetch(origin, request);
  }