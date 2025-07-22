### worker 使用  
--- ----
```javascript
export function startupLiveDataReceiverWorker() {
    let dispose: () => void;
    addEventListener('message', message => {
        const options = message.data as SubscribeLiveDataOptions;

        if (options && options.action === 'subscribeLiveData') {
            // @ts-ignore
            dispose = subscribeLiveData(options);
        }

        if (options && options.action === 'close') {
            if (dispose) {
                dispose();
            }
            close();
        }
    });
}

监听信息，通过 ‘subscribeLiveData’ 判断， dispose = subscribeLiveData(options);
```