## 入口
`app.component.ts`
* 国际化：从localStorage获取，没有就根据浏览器判断
* 目前只有三个模块，匹配 `window.location.search.indexOf('?projectId') === 0` ，带着 `projectId` 跳转到 `designer` 模块。
* 不在对应的网址下，有心跳检测。

## designer
* `designer.module.ts` 配置了 ngrx/store，状态管理。`ControlsModule` 模块在引入的时候，每个模块调用`useControls`初始化，`registerControlDefinition` 注册定义的组件，用于ribbon，菜单功能展示等；
* `designer.component.ts` 判断projectId，项目是否存在 
* `designer.component.html`
    ```
    <mm-designer-container></mm-designer-container>
    <mm-language-selector></mm-language-selector>
    <mm-designer-ribbon></mm-designer-ribbon>
    <mm-designer-layout *ngIf="translateLayoutTitles" [translateTitles]="translateLayoutTitles"></mm-designer-layout>
    ```

  * mm-designer-container  在这里设置了全局的projectId，鼠标、滚轮、键盘事件。
  * mm-language-selector 设置语言，这里getLanguage函数可以整合（todo）。切换语言，做了一个保存的操作，然后刷新页面。
  * mm-designer-ribbon 菜单集合，默认开始菜单
  * mm-designer-layout 展示区域


## live-data-proxy.directive
* 实时数据：subscribeLiveData，不自动触发，收集页面绑定的变量，重定义triggerSubscribeLiveData函数，注入逻辑；
* 告警数据：triggerSubscribeAlarmData，setupWorkers时候触发。监听的地方，通过FetchData，绑定在liveData上面，然后通过 !v.IsConfirmed && v.Info?.IsAlarm && v.Info?.Play 前端过滤，判断是否报警（播放报警声音）；
* ## runtime
```
RuntimeElementHierarchyManager: 组件结构管理，push 存储所有的组件，设置setAction函数，传入一个ID，action，id是组件唯一标识，action（函数），用来渲染控件；
executeRenderTask执行时候，批量处理action；action执行函数，control.renderRuntime（this.attachComponent.bind(this)），control.renderRuntime内部处理获取运行时候组件、对应的settings，传递给函数this.attachComponent；
attachComponent 函数，创建组件，给组件属性参数；
 if (runtimeComponent.alarmDataSubject) {
    const service = MimicRuntimeLiveDataService.get(this.mimicRuntimeInstanceId);
    service.alarmData$.subscribe(runtimeComponent.alarmDataSubject);
}
这里通过单例，获取服务数据，透传告警数据；组件通过处理alarmDataSubject获取数据，alarmDataSubject在组件里，通过FetchData，绑定在liveData上面；
```