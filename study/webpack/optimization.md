###优化loader配置
尽可能少的处理文件，使用`test`,`include`,`exclude`,减少范围。

###优化resolve.alias
比如引入react，为例减少递归，可以给它配置绝对路径
```javascript
{
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
    }
  }
}
```
>但是对于有些库使用本优化方法后会影响到后面要讲的使用 Tree-Shaking 去除无效代码的优化，
因为打包好的完整文件中有部分代码你的项目可能永远用不上。
