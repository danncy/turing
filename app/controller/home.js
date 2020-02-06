'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async clickCaptcha() {
    const { ctx } = this;

    ctx.type = 'image/jpg';
    ctx.body = await ctx.service.clickCaptcha.build();
  }
}

module.exports = HomeController;
