'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const checkCookie = middleware.checkCookie();
  const checkTicket = middleware.checkTicket();
  router.get('*', checkTicket, checkCookie, controller.home.index);
};
