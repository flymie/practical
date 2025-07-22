## control.ts
注册所有组件、设计、等等

## factory.ts  
生成注册、获取函数，维护在一个对象里，实例化时候setting传入进来初始化
 ```
 factories[key][type] = Constructor
 ```

 ## definition.ts
 维护所有的的组件定义，`ScadaControlDefinition`, 属性id和title都是对应控件的type  
 维护不能旋转的组件

