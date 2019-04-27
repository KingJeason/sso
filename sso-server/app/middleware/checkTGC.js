'use strict';
const { URL } = require('url');

module.exports = () => {
  return async (ctx, next) => {
    const TGC = ctx.cookies.get('TGC');
    const { url, header: { host } } = ctx.request;
    const joinUrl = new URL('http://' + host + url);
    const serviceUrl = joinUrl.searchParams.get('service');
    ctx.request.serviceUrl = serviceUrl;
    console.log(serviceUrl, 'url');
    if (!TGC) {
      await next();
    }
  };
};

