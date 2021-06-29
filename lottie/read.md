```json5
{
      "v": "5.1.13",       // bodymovin 版本
      "fr": 30,            // 帧率
      "ip": 0,             // 起始关键帧
      "op": 20,            // 结束关键帧
      "w": 150,            // 视图宽
      "h": 130,            // 视图高
      "nm": "鹅头收起动画",  // 名称
      "ddd": 0,             // 3d
      "assets": [],        // 资源集合 
      "layers": [],        // 图层集合
      "masker": []         // 蒙层集合
}
```

###动画方法  
|方法名|参数及返回类型|描述|
|---|---|---|
|getDuration|(inFrames?: boolean): number|获取动画时长，可按帧或按秒返回|
|play|(): void|播放|
|pause|(): void|暂停|
|setLocationHref|(href: string): void|一个参数通常作为location.href. 当您在 safari 中遇到 url 没有#符号的掩码问题时，它很有用|
|setSpeed|(speed: number): void|设置动画播放速速|
|goToAndPlay|(value: number, isFrame?: boolean): void|前进到传入帧并继续播放|
|goToAndPlay|(value: number, isFrame?: boolean): void|前进到传入帧并停止播放|
|setDirection|(direction: AnimationDirection): void|设置方向1 是正常方向|
|playSegments|(segments: Array, forceFlag: boolean): void|第一个参数是单个数组或多个数组，每个数组有两个值(fromFrame,toFrame)，第二个参数是一个布尔值，用于立即强制执行新段|
|setSubframe|(flag: boolean): void|如果为 false，它将尊重原始 AE fps。如果为真，它将尽可能多地更新|
|destroy|(): void|销毁|




