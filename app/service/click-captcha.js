'use strict';

const { Service } = require('egg');
const path = require('path');
const Canvas = require('canvas');

function fontFile(name) {
  return path.join(__dirname, '../public/fonts/', name);
}

function imageFile(name) {
  return path.join(__dirname, '../public/images/', name);
}

class ClickCaptchaService extends Service {
  /**
   * 创建图片
   *
   * @return {Buffer} image buffer
   */
  async build() {
    const { logger } = this.ctx;
    logger.debug('build a click captcha buffer.');

    Canvas.registerFont(fontFile('Pfennig.ttf'), { family: 'pfennigFont' });
    Canvas.registerFont(fontFile('PfennigBold.ttf'), { family: 'pfennigFont', weight: 'bold' });
    Canvas.registerFont(fontFile('PfennigItalic.ttf'), { family: 'pfennigFont', style: 'italic' });
    Canvas.registerFont(fontFile('PfennigBoldItalic.ttf'), { family: 'pfennigFont', weight: 'bold', style: 'italic' });

    const canvas = Canvas.createCanvas(320, 320);
    const context = canvas.getContext('2d');
    const image = await Canvas.loadImage(imageFile('lime-cat.jpg'));

    context.drawImage(image, 0, 0);

    context.font = 'normal normal 50px Helvetica';
    context.fillText('中', 0, 70);

    context.font = 'bold 50px pfennigFont';
    context.fillText('国', 70, 140, 100);

    context.font = 'italic 50px pfennigFont';
    context.fillText('加', 140, 210);

    context.font = 'bold italic 50px pfennigFont';
    context.fillText('油', 210, 280);

    return canvas.toBuffer('image/jpeg', { quality: 0.5 });
  }
}

module.exports = ClickCaptchaService;
