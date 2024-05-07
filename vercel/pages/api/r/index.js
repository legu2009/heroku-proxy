
const browserHeaders = {
    accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'accept-language': 'en-US,en;q=0.9',
    'origin': 'chrome-extension://ldmmifpegigmeammaeckplhnjbbpccmm',
    'sec-ch-ua': `" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"`,
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': `"macOS"`,
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'none',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
};

export default async function handler(request, response) {
    const res = await fetch(request.body, {
        method: 'GET',
        headers: browserHeaders
    });
    const html = await res.text();
    let m = html.match(/<title>(.*?)<\/title>/);
    return response.status(200).json({ title: m && m[1] ? m[1] : '' });
}
