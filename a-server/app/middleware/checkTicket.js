'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const ticket = ctx.query.ticket;
    const casServer = ctx.app.config.casServer;
    if (!ticket) {
      await next();
    } else {
      // 这一块目前不知道怎么让curl走host的代理所以直接写ip了
      const res = await ctx.curl(`http://127.0.0.1:3000/checkTicket?ticket=${ticket}`, {
        dataType: 'json',
      });
      if (res.data.success) {
        ctx.session['a-sessionID'] = res.data.user;
        await next();
      } else {
        ctx.redirect(casServer + '/login?service=a.com');
      }
    }

  };
};
