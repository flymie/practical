const divArr = []; // 右侧缩略图
const canvasWidth = 600; // 初始化画布宽高
const canvasHeight = 600;
const styleArr = []; // 拼接css，添加到div

// 创建右侧预览
function scanInit(el, styleArrParam) {
  el.innerHTML = ''; // 删除所有子元素
  const tempFra = document.createDocumentFragment();
  for (let i = 0; i < styleArrParam.length; i++) {
    const ele = document.createElement('div');
    const div = document.createElement('div');
    ele.append(div);
    div.style = styleArrParam[i];
    tempFra.append(ele);
    divArr.push(div);
  }
  el.append(tempFra);
}

// 记录每次划线的操作；
const pointArr = [
  {
    endX: 281,
    endY: 100,
    startX: 101,
    startY: 115,
  },
  {
    endX: 274,
    endY: 322,
    startX: 281,
    startY: 100,
  },
  {
    endX: 101,
    endY: 115,
    startX: 274,
    startY: 322,
    fillStyle: 'red',
  },
  {
    endX: 430,
    endY: 207,
    startX: 357,
    startY: 209,
  },
  {
    endX: 430,
    endY: 282,
    startX: 430,
    startY: 207,
  },
  {
    endX: 357,
    endY: 209,
    startX: 430,
    startY: 282,
    fillStyle: 'red',
  },
  {
    endX: 225,
    endY: 521,
    startX: 189,
    startY: 436,
  },
  {
    endX: 176,
    endY: 19,
    startX: 35,
    startY: 19,
  },
  {
    endX: 579,
    endY: 377,
    startX: 481,
    startY: 372,
  },
  {
    endX: 498,
    endY: 495,
    startX: 387,
    startY: 502,
  },
];
// pointArr = [{
//   startX: 1,
//   startY: 1,
//   endX: 1,
//   endY: 1,
//   fillStyle: 'red', // 如果有则填充
// }];

// 在线的两端画一个矩形用于辅助，用于闭合
function rectFn(ctx, x, y) {
  ctx.beginPath();
  ctx.rect(x - 3, y - 3, 6, 6);
  // const colorH = parseInt(Math.random() * 360, 10);
  // ctx.fillStyle = `hsl(${colorH},100%,50%)`;
  ctx.fillStyle = 'rgba(102, 51, 153, 1)';
  ctx.fill();
  ctx.beginPath();
}

// 判断如果是在某个点附近，就取这给点
function nearFn(x, y) {
  const roundNum = 4; // 精度范围
  const result = {
    x,
    y,
  };
  for (let i = 0, len = pointArr.length; i < len; i++) {
    const v = pointArr[i];
    if (Math.abs(v.startX - x) <= roundNum && Math.abs(v.startY - y) <= roundNum) {
      result.x = v.startX;
      result.y = v.startY;
      result.flag = true;
      break;
    }
    if (Math.abs(v.endX - x) <= roundNum && Math.abs(v.endY - y) <= roundNum) {
      result.x = v.endX;
      result.y = v.endY;
      result.flag = true;
      break;
    }
  }
  return result;
}

function canvasInit(canvas) {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 600, 600);
  // 恢复之前的操作
  // ctx.moveTo(10, 10);
  // pointArr.forEach((v) => {
  //   // ctx.moveTo(v.startX, v.startY);
  //   ctx.lineTo(v.endX, v.endY);
  //   // ctx.stroke();
  //   if (v.fillStyle) {
  //     ctx.closePath(); // 闭合时候加上可以减少缺口优化，低版本浏览器有的没优化缺口。
  //     ctx.fillStyle = v.fillStyle;
  //     ctx.fill();
  //     // ctx.stroke();
  //     // ctx.beginPath();
  //   }
  //   // rectFn(ctx, v.startX, v.startY);
  //   // rectFn(ctx, v.endX, v.endY);
  // });

  // ctx.beginPath();
  // ctx.moveTo(101, 115);
  // pointArr.forEach((v) => {
  //   console.log(v)
  //   ctx.lineTo(v.startX, v.startY);
  //   // ctx.stroke();
  //   if (v.fillStyle) {
  //     ctx.closePath(); // 闭合时候加上可以减少缺口优化，低版本浏览器有的没优化缺口。
  //     ctx.fillStyle = v.fillStyle;
  //     ctx.fill();
  //     // ctx.stroke();
  //     // ctx.beginPath();
  //   }
  //   // rectFn(ctx, v.startX, v.startY);
  //   // rectFn(ctx, v.endX, v.endY);
  // });

  for (let i = 0, len = pointArr.length; i < len;) {
    let v = pointArr[i];
    const fillStyleIndex = pointArr.findIndex((v2, ind2) => v2.fillStyle && ind2 >= i);
    // console.log(fillStyleIndex, len)
    ctx.beginPath();
    ctx.moveTo(v.startX, v.startY);
    if (fillStyleIndex !== -1) { // 说明要是闭合的
      for (let j = i + 1; j <= fillStyleIndex; j++) {
        v = pointArr[j];
        ctx.lineTo(v.startX, v.startY);
        // rectFn(ctx, v.startX, v.startY);
        // rectFn(ctx, v.endX, v.endY);
      }
      ctx.closePath(); // 闭合时候加上可以减少缺口优化，低版本浏览器有的没优化缺口。
      ctx.fillStyle = v.fillStyle;
      ctx.fill();
      i = fillStyleIndex + 1;
    } else { // 用直线连接
      ctx.lineTo(v.endX, v.endY);
      ctx.stroke();
      // ctx.closePath();
      // rectFn(ctx, v.startX, v.startY);
      // rectFn(ctx, v.endX, v.endY);
      i++;
    }
  }
  pointArr.forEach((v) => {
    rectFn(ctx, v.startX, v.startY);
    rectFn(ctx, v.endX, v.endY);
  });
  return ctx;
}

function canvasFn(canvas) {
  let ctx = canvasInit(canvas);
  const offsetleft = canvas.getBoundingClientRect().left;
  const offsettop = canvas.getBoundingClientRect().top;

  canvas.onmousedown = function (e) {
    // 绘制中
    canvas.onmousemove = function (e2) {
      ctx = canvasInit(canvas);
      // ctx.clearRect(0, 0, 600, 600);
      // // 恢复之前的操作
      // ctx.beginPath();
      // pointArr.forEach((v) => {
      //   ctx.moveTo(v.startX, v.startY);
      //   ctx.lineTo(v.endX, v.endY);
      //   ctx.stroke();
      //   // if (v.fillStyle) {
      //   //   ctx.closePath(); // 闭合时候加上可以减少缺口优化，低版本浏览器有的没优化缺口。
      //   //   ctx.fillStyle = v.fillStyle;
      //   //   ctx.fill();
      //   //   ctx.beginPath();
      //   // }
      //   rectFn(ctx, v.startX, v.startY);
      //   rectFn(ctx, v.endX, v.endY);
      // });

      ctx.beginPath();
      // 冗余，是交接处相连接
      const result = nearFn(e.pageX - offsetleft, e.pageY - offsettop);
      ctx.moveTo(result.x, result.y);
      const result2 = nearFn(e2.pageX - offsetleft, e2.pageY - offsettop);
      ctx.lineTo(result2.x, result2.y);
      ctx.stroke();
    };
    // 结束绘制
    canvas.onmouseup = function (e2) {
      canvas.onmouseup = null;
      canvas.onmousemove = null;
      ctx.closePath();
      // 加入到操作数据中
      const tempObj = {};
      // 开始位置
      const result = nearFn(e.pageX - offsetleft, e.pageY - offsettop);
      tempObj.startX = result.x;
      tempObj.startY = result.y;
      // 结束位置
      const result2 = nearFn(e2.pageX - offsetleft, e2.pageY - offsettop);
      tempObj.endX = result2.x;
      tempObj.endY = result2.y;

      if (!result.flag) {
        rectFn(ctx, result.x, result.y);
      }
      if (!result2.flag) {
        rectFn(ctx, result2.x, result2.y);
      }
      pointArr.push(tempObj);
      // console.log(pointArr)
    };
  };
}

// 撤回
function resetFn(canvas) {
  if (pointArr.length === 0) {
    return;
  }
  const len = pointArr.length - 1; // 取最后一个
  if (!pointArr[len].fillStyle) {
    pointArr.pop();
  } else {
    pointArr[len].fillStyle = undefined;
  }
  canvasInit(canvas);
}

// 填充
function paddingFn(canvas, color = '#ff0000') {
  const len = pointArr.length - 1; // 取最后一个
  // 至少有三个点才可以填充
  if (!pointArr[len - 1].fillStyle && !pointArr[len - 2].fillStyle) {
    pointArr[len].fillStyle = color;
  } else {
    alert('不能构成图形');
  }
  canvasInit(canvas);
  console.log(pointArr);
}

// 缩略图
function thumbnailFn() {
  styleArr.length = 0;
  // clip-path: polygon(0% 0%, 100% 0%, 100% 4px, 0% 4px);
  for (let i = 0, len = pointArr.length; i < len;) {
    let v;
    const fillStyleIndex = pointArr.findIndex((v2, ind2) => v2.fillStyle && ind2 >= i);
    if (fillStyleIndex !== -1) { // 说明要是闭合的
      let cssStr = '';
      for (let j = i; j <= fillStyleIndex; j++) {
        // ctx.moveTo(v.startX, v.startY);
        v = pointArr[j];
        cssStr += `${(v.startX / canvasWidth * 100).toFixed(4)}% ${(v.startY / canvasHeight * 100).toFixed(4)}%,`;
      }
      cssStr += `${(v.endX / canvasWidth * 100).toFixed(4)}% ${(v.endY / canvasHeight * 100).toFixed(4)}%`;
      cssStr = `clip-path: polygon(${cssStr})`;
      cssStr += `;background: ${v.fillStyle}`;
      styleArr.push(cssStr);
      i = fillStyleIndex + 1;
    } else { // 用直线连接
      i++;
    }
  }
  scanInit(document.querySelector('.right'), styleArr);
  // divArr.forEach((v, index) => {
  //   v.style = styleArr[index] || '';
  // });

  console.log(styleArr);
}

function copyCssFn(className) {
  const cssArr = [];
  // clip-path: polygon(0% 0%, 100% 0%, 100% 4px, 0% 4px);
  for (let i = 0, len = pointArr.length; i < len;) {
    let v;
    const fillStyleIndex = pointArr.findIndex((v2, ind2) => v2.fillStyle && ind2 >= i);
    if (fillStyleIndex !== -1) { // 说明要是闭合的
      let cssStr = '';
      for (let j = i; j <= fillStyleIndex; j++) {
        // ctx.moveTo(v.startX, v.startY);
        v = pointArr[j];
        cssStr += `${(v.startX / canvasWidth * 100).toFixed(4)}% ${(v.startY / canvasHeight * 100).toFixed(4)}%,`;
      }
      cssStr += `${(v.endX / canvasWidth * 100).toFixed(4)}% ${(v.endY / canvasHeight * 100).toFixed(4)}%`;
      cssStr = `clip-path: polygon(${cssStr})`;
      cssStr += `;background: ${v.fillStyle}`;
      cssArr.push(cssStr);
      i = fillStyleIndex + 1;
    } else { // 用直线连接
      i++;
    }
  }

  let cssStr = '';
  // .cat >div:nth-child(0) {
  //
  // }
  cssArr.forEach((v, index) => {
    cssStr += `.${className} >div:nth-child(${index + 1}){${v}} \n`;
  });

  // 用浏览器执行复制, 注意input是不会保留换行的。
  const input = document.createElement('textarea');
  document.body.append(input);
  input.value = cssStr;
  input.select(); // 选中文本
  document.execCommand('copy'); // 执行浏览器复制命令
  document.body.removeChild(input);
  alert('复制成功');

  console.log(cssStr);
}
