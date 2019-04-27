'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = `hi, ${ctx.request.username}, 这是 产品a`;
  }
}

module.exports = HomeController;
