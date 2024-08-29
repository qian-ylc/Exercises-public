```
> d = new $.Deferred
{
  notify: [Function (anonymous)],
  notifyWith: [Function: fireWith],
  resolve: [Function (anonymous)],
  resolveWith: [Function: fireWith],
  reject: [Function (anonymous)],
  rejectWith: [Function: fireWith],
  state: [Function: state],
  always: [Function: always],
  catch: [Function: catch],
  pipe: [Function: pipe],
  then: [Function: then],
  promise: [Function: promise],
  progress: [Function: add],
  done: [Function: add],
  fail: [Function: add]
}
```
`new $.Deferred`で作られたDeferredオブジェクトが自分のPromiseオブジェクトを持っている。\
DeferredとPromiseは1対1の関係で、対応するDeferredだけがそのPromiseの内部状態を変更できる。
```

> d.promise()
{
  state: [Function: state],
  always: [Function: always],
  catch: [Function: catch],
  pipe: [Function: pipe],
  then: [Function: then],
  promise: [Function: promise],
  progress: [Function: add],
  done: [Function: add],
  fail: [Function: add]
}
function delayHello()
{
  var d = new $.Deferred;
  setTimeout(function(){
    console.log('Hello!');
    d.resolve();
  }, 1000);
  return d.promise();
}
```
実際にDeferred使うとき、return d.promise()でPromiseを返すような形