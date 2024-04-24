```javascript
of(...Array)
from(Array)
.subscribe({
  next: (val) => {},
  error: (err) => {},
  complete: () => {},
})
.subscribe((val) => {})  === .subscribe({ next: (val) => {})
fromEvent(input, 'input', (e) => { e.target.value })

const subscription = interval(time).subscribe()
subscription.unsubscribe()

timer(time).subscribe()
interval(time).subscribe() === timer(0, time).subscribe()
  
.pipe(mapto('value'))

range(start, end).pipe(
  take(4),
  tap((val) => console.log(val))
)
```
