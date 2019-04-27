/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1556350704816_2637';

  // add your middleware config here
  config.middleware = [];
  config.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      '.ejs': 'ejs',
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '.a.com', '.b.com' ],
  };

  config.session = {
    key: 'TGC',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };

  config.ejs = {
    layout: 'layout.ejs',
  };
  // config.view = {
  //   mapping: {
  //     '.js': 'assets',
  //   },
  // };
  // config.devServer = {
  //   command: 'roadhog dev',
  //   port: 3099,
  // };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
