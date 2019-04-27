'use strict';
const fs = require('fs');
const path = require('path');
module.exports = () => {
  return async (ctx, next) => {
    const TGC = ctx.session.TGC;
    console.log(TGC);
    const ticketPath = path.resolve() + '/token_user.json';
    const {
      header: { host }, url,
    } = ctx.request;
    const joinUrl = new URL('http://' + host + url);
    const serviceUrl = joinUrl.searchParams.get('service');

    if (!TGC) {
      await next();
    } else {
      // 如果有TGC，则代表之前曾登录过SSO，则去数据库找对应信息
      let file = fs.readFileSync(ticketPath, 'utf8');
      if (!file) file = '{}';
      const data = JSON.parse(file);
      if (data[TGC]) {
        // 如果找到了，则给业务server发ticket
        ctx.redirect('http://' + serviceUrl + `?ticket=${TGC}`);
      } else {
        // 如果没找到则代表session失效，则进入登录页
        await next();
      }
    }
  };
};

