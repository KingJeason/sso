'use strict';

const Controller = require('egg').Controller;
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.set('Content-Type', 'text/html');
    await this.ctx.render('layout.ejs', {
      title: 'SSO-LOGIN',
    });
  }

  async checkTicket() {
    const { ctx } = this;
    const ticketPath = path.resolve() + '/token_user.json';
    const ticket = ctx.query.ticket;
    ctx.set('Content-Type', 'application/json');
    let file = fs.readFileSync(ticketPath, 'utf8');
    if (!file) file = '{}';
    const data = JSON.parse(file);
    if (data[ticket]) {
      ctx.status = 200;
      ctx.body = {
        success: true,
        user: data[ticket],
      };
    } else {
      ctx.status = 200;
      ctx.body = {
        success: false,
      };
    }

  }

  async login() {
    const { ctx } = this;
    const {
      header: { referer },
      body: { name, password },
    } = ctx.request;
    const joinUrl = new URL(referer);
    const serviceUrl = joinUrl.searchParams.get('service');
    const token = new Date().getTime() + '_';
    const ticketPath = path.resolve() + '/token_user.json';
    // 这里省略了查库校验账号密码的步骤，直接判断name === password
    if (name === password) {
      const ticket = token + name;
      // 给 sso.com 注入cookie
      ctx.session.TGC = ticket;
      fs.readFile(ticketPath, 'utf8', (err, TGT) => {
        if (err) throw err;
        if (!TGT) TGT = '{}';
        TGT = JSON.parse(TGT);
        // 以ticket为key
        TGT[ticket] = name;
        fs.writeFile(ticketPath, JSON.stringify(TGT), err => {
          if (err) throw err;
        });
      });
      return ctx.redirect('http://' + serviceUrl + `?ticket=${ticket}`);
    }
  }
}

module.exports = HomeController;
