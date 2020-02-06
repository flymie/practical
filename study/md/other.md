###css 加载渲染：
css加载不会阻塞Dom的解析，但是会阻塞Dom的渲染，因为GUI和js渲染引擎相互独立，所以也会阻塞js的执行。  

###GET与POST区别：  
get请求可以作为书签，post不可以。  
get请求参数是有大小限制的2k，post是没有的。编码上get是ASCII，post没有限制，get一般是
把数据放在请求头发送过去的，post请求一般是放在请求体里面的，这是一种标准。get也可以把数据
放在请求体中发送过去，但是有的服务器会解析，有的不会。另一方面，get请求会产生
一个TCP包，一次性把请求头数据都发送过去，服务器响应；一般情况post会产生两个TCP包，第一次
是作为确定，code100，收到确定后，再把数据发送过去。之所以说一般情况，是因为火狐有版本post是发送一次的。

###原型到原型链
函数对象都有prototype，原型下面有constructor属性，指向当前函数。每个对象都有__proto__,
此函数对象如果作为构造函数，new的对象的__proto__,指向的是构造函数原型。如果此对象没有相关属性，
就会沿着原型链往上找。相关名词我所理解的意思：  
prototype: 原型；  
constructor： 构造者   
__ proto __: 构造函数原型  

###js词法作用域和动态作用域
js是词法作用域也就是静态作用域

###规范中的this  
js规范中存在一种用于规范的类型，他的作用适用于描述底层逻辑。Reference（参考）,构成的三个部分： 
 
* base value
* referenced name
* strict reference  

base value就是所属的对象或是EnvironmentRecord，它的值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种。
对于base value，就有函数来取值，getBase，取得的是base value，就是所属的对象或者是环境的记录；getValue返回的是对象真正的值；还有一个方法IsPropertyReference，字面意思就是判断
是否是ref的属性，如果getBase返回的是一个对象就是true。this的指向和reference有很大关系。  
1、计算MemberExpression的值赋给ref
2、判断ref是否是reference类型  
```
if  ref是reference类型，  
    if isPrototypeReference, this就是getBase值
    else base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)
else  this就是undefined，非严格模式下就是全局
```




