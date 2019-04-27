'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const checkTGC = middleware.checkTGC();
  router.get('/login', checkTGC, controller.home.index);
};
