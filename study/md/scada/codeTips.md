```javascript
private zone: NgZone

this.zone.run(() => {
    // 在这里处理获取到的数据，假设把响应数据赋值给组件的某个属性
    // 这样 Angular 就会触发变更检测，更新对应的 UI 显示
});
```
* NgZone 主要用于管理 Angular 的变更检测机制与 JavaScript 的异步操作（如 setTimeout、Promise、Ajax 请求等）之间的关联。它可以帮助确定在何时触发 Angular 的变更检测循环，确保在合适的时机更新 UI 界面以反映数据模型的变化，简单来说，它划分出了一个区域，在这个区域内执行的操作可以被 Angular 更好地 “感知”，进而正确地处理组件的更新等相关事宜。

###  不确定，待验证
```javascript
metaReducers  它们会在每次状态更新时按照顺序执行
```

### `ControlsModule` 模块在引入的时候，每个模块调用`useControls`初始化，`registerControlDefinition` 注册定义的组件，用于ribbon，菜单功能展示。
```javascript
ControlsModule 
```


```javascript
fabric
```
