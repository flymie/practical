// chrome.tabs.onMessage.addListener(//监听扩展程序进程或内容脚本发送的请求
//   function (request, sender, sendResponse) {
//     if (request.action == "start") {
//       sendResponse({ kw: 'ok' });
//     }
//   }
// );
// document.body.style.background = 'green';

// chrome.runtime.sendMessage({
//   info: "我是 content.js"
// }, res => {
//   // 答复
//   alert(res)
// })

// 监听扩展程序进程或内容脚本发送的请求
//  {
//     title: '公文号', render: 'officialCode', width: 120, dataIndex: 'XXX1',
//   },
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'start') {
    const tableWrap = document.querySelectorAll('.so-table-simple-body');
    const resDiv = tableWrap[1] ? tableWrap[1] : tableWrap[0];
    const trList = resDiv.querySelectorAll('tr');
    const columns = [];
    Array.prototype.forEach.call(trList, (tr) => {
      const render = tr.childNodes[0].childNodes[0].innerText;
      if (!['code', 'msg', 'info', 'list', 'msg', 'count', 'error'].includes(render)) {
        const title = tr.childNodes[1].childNodes[0].innerText
            || tr.childNodes[1].childNodes[0].textContent.trim()
            || tr.childNodes[5].childNodes[0].innerText
            || tr.childNodes[5].childNodes[0].textContent.trim();
        const obj = {
          title,
          render,
          width: 100,
          dataIndex: render,
        };
        columns.push(obj);
      }
    });

    console.log(JSON.stringify(columns));
    // 复制
    // const aux = document.createElement('textarea');
    // aux.value = columns.join();
    // document.body.appendChild(aux);
    // aux.select();
    // document.execCommand('copy');
    // document.body.removeChild(aux);
    alert('console.log中复制');

    sendResponse('处理columns结束');
  }
});
