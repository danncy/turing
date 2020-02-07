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

    const canvas = Canvas.createCanvas(360, 400);
    const context = canvas.getContext('2d');
    const image = await Canvas.loadImage(imageFile('lime-cat.jpg'));

    context.save();
    context.drawImage(image, 0, 0);
    context.font = 'normal normal 50px Helvetica';
    context.rotate(Math.PI / 6);
    context.fillText('中', 70, 70);
    const t1 = context.measureText('中');
    context.restore();
    console.log(t1);


    context.save();
    context.font = 'bold 50px pfennigFont';
    context.rotate(270);
    context.fillText('国', 140, 140, 100);
    const t2 = context.measureText('国');
    console.log(t2);
    context.restore();

    context.save();
    context.font = 'italic 50px pfennigFont';
    context.fillText('加', 210, 210);
    const t3 = context.measureText('加');
    console.log(t3);
    context.restore();

    context.font = 'bold italic 50px pfennigFont';
    context.fillText('油', 280, 280);
    const t4 = context.measureText('油');
    console.log(t4);
    context.save();

    return canvas.toBuffer('image/jpeg', { quality: 0.5 });
  }
}

module.exports = ClickCaptchaService;
