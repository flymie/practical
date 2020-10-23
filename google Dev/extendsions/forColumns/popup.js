const btn = document.querySelector('#btn');
// const bg = chrome.extension.getBackgroundPage()

btn.addEventListener('click', () => {
  // bg.toPopup();

  // 这里要先获取在那个标签页面
  // chrome.tabs.query({ active: true}, function (tab) {//获取当前tab
  //   //向tab发送请求
  //   chrome.tabs.sendMessage(tab.id, { action: 'start'}, function (response) {
  //     console.log(response)
  //   });
  // });

  chrome.tabs.query({
    active: true,
    currentWindow: true,
  }, (tabs) => {
    const message = {
      action: 'start',
    };
    chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
      console.log('popup=>content');
      console.log(res);
    });
  });
});

// chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
//   sendResponse('我收到了你的来信')
//   console.log('接收了来自 content.js的消息', req.info)
// })
