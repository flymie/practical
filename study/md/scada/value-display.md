## 组件的一些解释

* 指令 mm-visibility-animation-processor  
  * 通过rxjs响应式，通过配置判断等，设置宿主样式 display、pointer-events
    ```javascript
    extends BaseConfigurationProcessor

    class BaseConfigurationProcessor<T extends BaseRuntimeComponent = BaseRuntimeComponent>

    constructor(viewContainerRef: ViewContainerRef) {
            super(viewContainerRef);
        }

        通过 viewContainerRef 指向指令所在的元素
    ```
  * `this.useExpressions()`
    ```javascript
        -> this.buildExpressionValueObservable
        -> this.hostRuntimeComponent.buildExpressionValueObservable

            当前是 runtime-value-display.component 组件，通过继承关系，就是调用  BaseRuntimeComponent.buildExpressionValueObservable
     ```
   * `buildExpressionValueObservable`
        ```javascript
        通过 settingKey 获取表达式，
        调用取值逻辑，里面设计各种变量替换等； triggerSubscribeLiveData（这个是松散关系，又很重要）
        通过 this.liveDataSubject = new Subject<LiveDataResult>() 返回数据流
        ```
        * `MimicRuntimeLiveDataService`
            ```javascript
            这个是单例模式，通过instanceId判断是否生成过，进行维护；
            mmLiveDataProxy 实时数据指令中，通过 mimicRuntimeInstanceId（instanceId）获取 runtimeLiveDataService实例（代码：1）

            async ngOnInit() {
                this.runtimeLiveDataService = MimicRuntimeLiveDataService.get(this.mimicRuntimeInstanceId); // （1）
                this.runtimeLiveDataService.triggerSubscribeLiveData = this.triggerSubscribeLiveData.bind(this); // （2）
            }

            重定义triggerSubscribeLiveData函数，注入逻辑（代码2）；通过ws建立的数据通信 postMessage，在onmessage监听时候，
            this.runtimeLiveDataService.onReceiveLiveDataMessage(liveDataResult)
            函数里面通过 liveDataSubject 发出数据；地方监听使用；
            ```
    * 通过上面逻辑，通过返回的数据流进行宿主样式变化