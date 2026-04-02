/// <reference types="@cloudflare/workers-types" />

interface Env {
  ASSETS: Fetcher;
  AUTH_USERNAME: string;
  AUTH_PASSWORD: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Basic認証を有効にする際は以下のコメントを解除し、最後のreturnを削除
    // const authHeader = request.headers.get('Authorization');
    // if (authHeader?.startsWith('Basic ')) {
    //   const base64 = authHeader.slice(6);
    //   const decoded = atob(base64);
    //   const colonIndex = decoded.indexOf(':');
    //   if (colonIndex !== -1) {
    //     const username = decoded.slice(0, colonIndex);
    //     const password = decoded.slice(colonIndex + 1);
    //     if (username === env.AUTH_USERNAME && password === env.AUTH_PASSWORD) {
    //       return env.ASSETS.fetch(request);
    //     }
    //   }
    // }
    // return new Response('Unauthorized', {
    //   status: 401,
    //   headers: {
    //     'WWW-Authenticate': 'Basic realm="Portfolio", charset="UTF-8"',
    //   },
    // });

    const response = await env.ASSETS.fetch(request);
    if (response.status === 404) {
      const url = new URL(request.url);
      url.pathname = '/404';
      const notFoundPage = await env.ASSETS.fetch(new Request(url.toString(), request));
      return new Response(notFoundPage.body, {
        status: 404,
        headers: notFoundPage.headers,
      });
    }
    return response;
  },
};
