window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

function CircleAnimal(canvas, obj) {
  return new CircleAnimal.prototype.init(canvas, obj);
}
CircleAnimal.prototype = {
  construct: CircleAnimal,
  init: function (canvas, obj) {
    this.cw = canvas.width;
    this.ch = canvas.height;
    this.ctx = canvas.getContext('2d');
    this.bubbles = [];
    for (let i = 0; i < obj.num; i++) {
      this.bubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        xval: 0,
        yval: Math.random() * 2 + 0.2,
        r: Math.random() * 4 + 1,
        color: '#fff',
      });
    }
    return this;
  },
  renderBubble: function (bubble) {
    this.ctx.beginPath();
    this.ctx.fillStyle = bubble.color;
    this.ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  },
  renderBubbles: function(){
    this.bubbles.forEach(v => {
      v.x += v.xval;
      v.y -= v.yval;
      if (v.y < 0) {
        Object.assign(v, {
          x: Math.random() * this.cw,
          y: this.ch,
          xval: 0,
          yval: Math.random() * 2 + 0.2,
          r: Math.random() * 4 + 1,
        })
      }
      this.renderBubble(v);
    });
  },
  renderCanvas: function () {
    this.ctx.clearRect(0, 0, this.cw, this.ch);
    this.renderBubbles();
    window.requestAnimationFrame(() => this.renderCanvas());
  }
};
CircleAnimal.prototype.init.prototype = CircleAnimal.prototype;

function startRun(el) {
  const canvas = document.createElement('canvas');
  canvas.width = el.offsetWidth;
  canvas.height = el.offsetHeight;
  el.appendChild(canvas);
  const circleAnimal = new CircleAnimal(canvas, {num: 50});
  circleAnimal.renderCanvas();
}
