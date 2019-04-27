'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const session = ctx.cookies.get('a-sessionID');
    console.log(ctx.request);
    const casServer = ctx.app.config.casServer;
    const { header: { host }, url } = ctx.request;
    const serviceUrl = host + url;
    if (!session) {
      ctx.redirect(casServer + `?service=${serviceUrl}`);
    }
    await next();
  };
};

