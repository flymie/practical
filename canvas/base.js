/**
 * 简单分装一下
 * @param id
 * @returns {CanvasRenderingContext2D | WebGLRenderingContext}
 */
function ctxFn(id) {
  const canvas = document.getElementById(id);
  canvas.width = 300;
  canvas.height = 300;
  return canvas.getContext('2d');
}

/**
 * 图片加载
 * @param url
 * @returns {Promise<any>}
 */
function imageLoad(url) {
  const img = new Image(url);
  img.src = url;
  return new Promise((resolve, reject) => {
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
}

/**
 * 圆角矩形
 * @param cxt
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radius
 */
function drawRoundRect(cxt, x, y, width, height, radius){
  cxt.beginPath();
  cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
  cxt.lineTo(width - radius + x, y);
  cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
  cxt.lineTo(width + x, height + y - radius);
  cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
  cxt.lineTo(radius + x, height +y);
  cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
  cxt.closePath();
}

window.onload = function () {
  (function () {
    const ctx = ctxFn('canvas1');
    // 折线
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    ctx.moveTo(0, 0);
    ctx.lineTo(150, 50);
    ctx.lineTo(300, 0);
    ctx.lineCap = 'butt';
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'red';
    ctx.stroke();

    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    ctx.moveTo(0, 20);
    ctx.lineTo(150, 70);
    ctx.lineTo(300, 20);
    ctx.lineCap = 'round';
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    ctx.moveTo(0, 40);
    ctx.lineTo(150, 90);
    ctx.lineTo(300, 40);
    ctx.lineCap = 'square';
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'green';
    ctx.stroke();

    // 加个线渐变
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    ctx.moveTo(0, 60);
    ctx.lineTo(150, 110);
    ctx.lineTo(300, 60);
    // 添加渐变线
    const grd = ctx.createLinearGradient(0, 60, 300, 60);
    grd.addColorStop(0, 'black');
    grd.addColorStop(0.5, 'white');
    grd.addColorStop(1, 'black');
    ctx.lineCap = 'square';
    ctx.lineWidth = 10;
    ctx.strokeStyle = grd;
    ctx.stroke();
  }());

  (function () {
    // 折线写矩形
    const ctx = ctxFn('canvas2');
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 200);
    ctx.lineTo(200, 200);
    ctx.lineTo(200, 50);
    // ctx.lineTo(50, 50); // 如果是闭合可以不行
    ctx.closePath(); // 闭合时候加上可以减少缺口优化，低版本浏览器有的没优化缺口。
    ctx.lineWidth = 5;
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'green';
    ctx.fill();
    ctx.stroke();
  }());

  (function () {
    // 矩形
    const ctx = ctxFn('canvas3');
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    ctx.rect(50, 50, 150, 150);
    const grd = ctx.createLinearGradient(0, 60, 300, 60);
    grd.addColorStop(0, 'black');
    grd.addColorStop(0.5, 'white');
    grd.addColorStop(1, 'black');
    ctx.lineWidth = 5;
    ctx.lineCap = 'square';
    ctx.lineWidth = 10;
    ctx.strokeStyle = grd;
    ctx.fillStyle = grd;
    ctx.fill();
    ctx.stroke();
  }());

  (function () {
    // 填充样式
    const ctx = ctxFn('canvas4');
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    imageLoad('../css-attr/images/userImg240.png').then((img) => {
      const pattern = ctx.createPattern(img, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, 300, 300);
    }).catch((e) => {
      console.log(e);
    });
  }());

  (function () {
    // 圆角矩形
    const ctx = ctxFn('canvas5');
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    drawRoundRect(ctx, 50, 50, 200, 200, 50);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }());
};
