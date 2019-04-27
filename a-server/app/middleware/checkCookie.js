'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const username = ctx.session['a-sessionID'];
    const casServer = ctx.app.config.casServer;
    const { header: { host }, url } = ctx.request;
    const serviceUrl = host + url;
    if (!username) {
      ctx.redirect(casServer + `/login?service=${serviceUrl}`);
    } else {
      ctx.request.username = username;
      await next();
    }
  };
};

