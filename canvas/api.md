##线条的属性
lineCap定义的是线条的端点  
* butt: 默认值，端点是垂直于线段边缘的平直边缘
* round：端点是在线段边缘处以线宽为直径的半圆。
* square：端点是在选段边缘处以线宽为长、以一半线宽为宽的矩形。   

lineJoin定义的是连接处的样式  
* miter：默认值，在连接处边缘延长相接。miterLimit 是角长和线宽所允许的最大比例(默认是 10)。
* bevel：连接处是一个对角线斜角。
* round：连接处是一个圆。

lineWidth：线宽，默认值是1.0  
strokeStyle: 定义线和形状边框的颜色和样式。

线性渐变  
```javascript
var grd = ctx.createLinearGradient(xstart,ystart,xend,yend);
grd.addColorStop(stop,color);
```
径向渐变
```javascript
var grd = context.createRadialGradient(x0,y0,r0,x1,y1,r1);
grd.addColorStop(stop,color);
```
createPattern()
```javascript
createPattern(img,repeat-style);
const pattern = context.createPattern(img,"repeat");
context.fillStyle = pattern;
context.fillRect(); // 填充
```
arc()绘制圆弧
```javascript
context.arc(x,y,radius,startAngle,endAngle,anticlockwise)
```
前面三个参数，分别是圆心坐标与圆半径。startAngle、endAngle使用的是弧度值，不是角度值。  
比如你绘制 0.5pi ~ 1pi 的圆弧，如果顺时针画，就只是左下角那1/4个圆弧；如果逆时针画，就是与之互补的右上角的3/4圆弧。  

arc()绘制圆弧
```javascript
arcTo(x1, y1, x2, y2, radius)
```
arcTo()方法将利用当前端点、端点1(x1,y1)和端点2(x2,y2)这三个点所形成的夹角，
然后绘制一段与夹角的两边相切并且半径为radius的圆上的弧线。
弧线的起点就是当前端点所在边与圆的切点，弧线的终点就是端点2(x2,y2)所在边与圆的切点，
并且绘制的弧线是两个切点之间长度最短的那个圆弧。  
**此外，如果当前端点不是弧线起点，arcTo()方法还将添加一条当前端点到弧线起点的直线线段。**
