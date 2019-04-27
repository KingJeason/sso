'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const checkCookie = middleware.checkCookie();
  router.get('*', checkCookie, controller.home.index);
};
