###lineCap定义的是线条的端点  
* butt: 默认值，端点是垂直于线段边缘的平直边缘
* round：端点是在线段边缘处以线宽为直径的半圆。
* square：端点是在选段边缘处以线宽为长、以一半线宽为宽的矩形。   

###lineJoin定义的是连接处的样式  
* miter：默认值，在连接处边缘延长相接。miterLimit 是角长和线宽所允许的最大比例(默认是 10)。
* bevel：连接处是一个对角线斜角。
* round：连接处是一个圆。

lineWidth：线宽，默认值是1.0  
strokeStyle: 定义线和形状边框的颜色和样式。

###线性渐变:createLinearGradient
```javascript
var grd = ctx.createLinearGradient(xstart,ystart,xend,yend);
grd.addColorStop(stop,color);
```
###径向渐变:createRadialGradient
```javascript
var grd = context.createRadialGradient(x0,y0,r0,x1,y1,r1);
grd.addColorStop(stop,color);
```
###填充样式createPattern()
```javascript
createPattern(img,repeat-style);
const pattern = context.createPattern(img,"repeat");
context.fillStyle = pattern;
context.fillRect(); // 填充
```
###arc()绘制圆弧
```javascript
context.arc(x,y,radius,startAngle,endAngle,anticlockwise)
```
前面三个参数，分别是圆心坐标与圆半径。startAngle、endAngle使用的是弧度值，不是角度值。  
比如你绘制 0.5pi ~ 1pi 的圆弧，如果顺时针画，就只是左下角那1/4个圆弧；如果逆时针画，就是与之互补的右上角的3/4圆弧。  

###arc()绘制圆弧
```javascript
arcTo(x1, y1, x2, y2, radius)
```
arcTo()方法将利用当前端点、端点1(x1,y1)和端点2(x2,y2)这三个点所形成的夹角，
然后绘制一段与夹角的两边相切并且半径为radius的圆上的弧线。
弧线的起点就是当前端点所在边与圆的切点，弧线的终点就是端点2(x2,y2)所在边与圆的切点，
并且绘制的弧线是两个切点之间长度最短的那个圆弧。  
**此外，如果当前端点不是弧线起点，arcTo()方法还将添加一条当前端点到弧线起点的直线线段。**

###贝塞尔曲线
```javascript
context.quadraticCurveTo(cpx,cpy,x,y); // 二次
context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y); // 三次
```

###变换：  
* 平移变换：translate(x,y)
* 旋转变换：rotate(deg)
* 缩放变换：scale(sx,sy)  

**！！需要注意的是如果不使用恢复，是按照上次变换继续变化的**  
同画圆弧一样，这里的`rotate(deg)`传入的参数是弧度，不是角度。  
缩放的时候，是缩放整个画布。坐标不是原点，尽量不要使用scale。
```javascript
var context = canvas.getContext("2d");
context.fillStyle = "#FFF";
context.fillRect(0,0,800,600);
context.fillStyle = "#00AAAA";
context.fillRect(100,100,200,100);

context.save(); // 平移之前保存坐标状态
context.fillStyle = "red";
context.translate(100,100);
context.fillRect(100,100,200,100);
context.restore(); // 结束后恢复。确定左边参照物统一

context.save();
context.fillStyle = "green";
context.translate(200,200);
context.fillRect(100,100,200,100);
context.restore();

```
就像css中那样，都是transform下的变换。  
context.transform(a,b,c,d,e,f) 

|    参数    | 意义 |
| :-------: | :---:|
|     a     |  水平缩放(1)  |
|     b     |  水平倾斜(0)  |  
|     c     |  垂直倾斜(0)  |  
|     d     |  垂直缩放(1)  |  
|     e     |  水平位移(0)  |  
|     f     |  垂直位移(0)  |  
同样transform也会累积，如果要保持参照坐标，`setTransform`,同样是六个参数，
参数意义和transform一样。  

###文本字体，对齐方式，渲染度量，相关api自行查阅。  
[https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_text]()

###裁剪clip() 
裁剪是对画布进行的，裁切后的画布不能恢复到原来的大小，
也就是说画布是越切越小的，要想保证最后仍然能在canvas最初定义的大小下绘图,
需要注意`save()`和`restore()`。  

###绘制图像：drawImage()
注意：drawImage()参数不通的时候，是不一样的。  
1. 三参数：context.drawImage(img,x,y)
2. 五参数：context.drawImage(img,x,y,width,height)  
3. 九参数：context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height)   

|    参数        | 描述 |
| :-------:     | :---:|
|     img       |  规定要使用的图像、画布或视频。  |
|     sx        |  开始剪切的 x 坐标位置。  |  
|     sy        |  开始剪切的 y 坐标位置。  |  
|     swidth    |  被剪切图像的宽度。  |  
|     sheight   |  被剪切图像的高度。  |  
|     x         |  在画布上放置图像的 x 坐标位置。  |  
|    y          | 在画布上放置图像的 y 坐标位置。|
|     width     | 要使用的图像的宽度。（伸展或缩小图像） |
|   height      | 要使用的图像的高度。（伸展或缩小图像） |

###操作像素点的api
* createImageData: 返回 ImageData 对象的宽度;  
* getImageData: 画布上指定的矩形复制像素数据;可以进行图像处理，做一些矩阵变换，做一些腐蚀，负片，灰化效果，
还可以做一些数字图像处理，做一些特定的识别之类。
* putImageData：把图像数据（从指定的 ImageData 对象）放回画布上
* context.clearRect(x,y,w,h)：擦除，不解释。
*  isPointInPath()方法. 定义与用法： isPointInPath()方法返回true，
如果给定的点的坐标位于路径之内的话（包括路径的边）,否则返回false。如果写一些动画，交互，这个应该会用到。
* fill()有两个参数可选：nonzero | evenodd。“nonzero”是非零环绕原则，也是默认值，“evenodd”为奇偶原则。
    * 1、非零环绕原则nonzero  
         * 在路径包围的区域中，随便找一点，向外发射一条射线，
         * 和所有围绕它的边相交，
         * 然后开启一个计数器，从0计数，
         * 如果这个射线遇到顺时针围绕，那么+1，
         * 如果遇到逆时针围绕，那么-1，
         * 如果最终值非0，则这块区域在路径内。
    * 2、奇偶原则evenodd
        * 在路径包围的区域中，随便找一点，向外发射一条射线，
        * 和所有围绕它的边相交，
        * 查看相交线的个数，如果为奇数，就填充，如果是偶数，就不填充。
