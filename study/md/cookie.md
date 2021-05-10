当第一次访问服务器时候，响应首部 Set-Cookie 被用来由服务器端向客户端发送 cookie，此后再次请求服务器会带上
相应的cookie。  
Set-Cookie: <cookie-name>=<cookie-value>;Expires=<date>；Max-Age=<non-zero-digit>；Domain=<domain-value>；
Path=<path-value>；Secure；HttpOnly

##<cookie-name>=<cookie-value>  
一个 cookie 开始于一个名称/值对：  
* <cookie-name> 可以是除了控制字符 (CTLs)、空格 (spaces) 或制表符 (tab)之外的任何 US-ASCII 字符。同时不能包含以下分隔字符： ( ) < > @ , ; : \ " /  [ ] ? = { }.
* <cookie-value> 是可选的，如果存在的话，那么需要包含在双引号里面。 
## Expires= < date>
cookie 的最长有效时间，形式为符合 HTTP-date 规范的时间戳。  
`Expires=Wed, 21 Oct 2015 07:28:00 GMT;`
## Max-Age=<non-zero-digit>
`max-age=31536000`
一些老的浏览器（ie6、ie7 和 ie8）不支持这个属性。对于其他浏览器来说，假如二者 （指 Expires 和Max-Age） 均存在，那么 Max-Age 优先级更高。
如果expires都不设置，那么浏览器关闭了就结束了。Expires默认值：Session
##domain属性
domain属性可以使多个web服务器共享cookie。domain属性的默认值是创建cookie的网页所在服务器的主机名。不能将一个cookie的域设置成服务器所在的域之外的域。  
例如让位于a.sodao.com的服务器能够读取b.sodao.com设置的cookie值。如果b.sodao.com的页面创建的cookie把它的path属性设置为“/”，把domain属性设置成“.sodao.com”，
那么所有位于b.sodao.com的网页和所有位于a.sodao.com的网页，以及位于sodao.com域的其他服务器上的网页都可以访问这个cookie。
##path属性  
它指定与cookie关联在一起的网页。在默认的情况下cookie会与创建它的网页，该网页处于同一目录下的网页以及与这个网页所在目录下的子目录下的网页关联。
指定一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie 首部。  
##Secure
一个带有安全属性的 cookie 只有在请求使用SSL和HTTPS协议的时候才会被发送到服务器。然而，保密或敏感信息永远不要在 HTTP cookie 中存储或传输，因为整个机制从本质上来说都是不安全的，比如前述协议并不意味着所有的信息都是经过加密的。
##HttpOnly
设置了 HttpOnly 属性的 cookie 不能使用 JavaScript 的api获取。




