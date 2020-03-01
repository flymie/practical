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
 * @returns {Promise<>}
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
 * 圆角矩形,使用arc()
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radius
 */
function drawRoundRectByArc(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
  ctx.lineTo(width - radius + x, y);
  ctx.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
  ctx.lineTo(width + x, height + y - radius);
  ctx.arc(width - radius + x, height - radius + y, radius, 0, Math.PI / 2);
  ctx.lineTo(radius + x, height + y);
  ctx.arc(radius + x, height - radius + y, radius, Math.PI / 2, Math.PI);
  ctx.closePath();
}

/**
 * 圆角矩形,使用arcTo()
 * @param ctx
 * @param x
 * @param y
 * @param width
 * @param height
 * @param radius
 */
function drawRoundRectByArcTo(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + width - radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.moveTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.moveTo(x + radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
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
    drawRoundRectByArc(ctx, 50, 50, 200, 200, 50);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.shadowColor = 'red';
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 0;
    ctx.stroke();
  }());
  (function () {
    // 圆角矩形
    const ctx = ctxFn('canvas6');
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    drawRoundRectByArcTo(ctx, 50, 50, 200, 200, 50);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }());
  (function () {
    // 裁剪
    const ctx = ctxFn('canvas7');
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, 300, 300);

    // 在屏幕上绘制一个大方块
    ctx.fillStyle = 'black';
    ctx.fillRect(10, 10, 200, 200);
    ctx.save();
    ctx.beginPath();

    // 裁剪画布从(0，0)点至(80，80)的正方形
    ctx.rect(0, 0, 80, 80);
    ctx.clip();

    // 红色圆
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.arc(100, 100, 100, 0, Math.PI * 2, false);
    // 整圆
    ctx.stroke();
    ctx.closePath();

    ctx.restore();

    // 再次裁切整个画布
    ctx.beginPath();
    ctx.rect(0, 0, 200, 200);
    ctx.clip();

    // 绘制一个没有裁切的蓝线的整圆
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.arc(100, 100, 50, 0, Math.PI * 2, false);
    ctx.stroke();
  }());
  (function () {
    // 绘制图像
    const ctx = ctxFn('canvas8');
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    imageLoad('../css-attr/images/userImg240.png').then((img) => {
      ctx.drawImage(img, 0, 0, 300, 300);
    }).catch((e) => {
      console.log(e);
    });
  }());
  (function () {
    function pick(ctx, el, event) {
      const x = event.pageX - el.offsetLeft;
      const y = event.pageY - el.offsetTop;
      console.log(event.pageX, event.pageY);
      const pixel = ctx.getImageData(x, y, 1, 1);
      const { data } = pixel;
      const rgba = `rgba(${data[0]},${data[1]},${data[2]},${data[3] / 255})`;
      return rgba;
    }
    // 绘制图像
    const canvas9 = document.querySelector('#canvas9');
    const ctx = ctxFn('canvas9');
    ctx.beginPath(); // 不写，那么stroke会覆盖之前颜色样式
    imageLoad('../css-attr/images/userImg240.png').then((img) => {
      ctx.drawImage(img, 0, 0, 300, 300);
      canvas9.addEventListener('click', (e) => {
        const colorText = pick(ctx, canvas9, e);
        document.querySelector('#colorBlock').style.background = colorText;
        document.querySelector('#colorText').style.color = colorText;
        document.querySelector('#colorText').innerHTML = colorText;
      });
    }).catch((e) => {
      console.log(e);
    });
  }());
};
