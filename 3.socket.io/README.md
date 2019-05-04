- socket.io
```js
    Socket.prototype.send =
    Socket.prototype.write = function(){
        //把参数列表变成一个数组
    var args = Array.prototype.slice.call(arguments);
        // ['服务器你好']
        // 向数组头部添了一个元素message['message','服务器你好']
        args.unshift('message');
        this.emit.apply(this, args);
        // this.emit('message','服务器你好') ==> socket.emit('message','服务器你好')
        return this;
    };
```

### 划分命名空间
- http://www.zhufengpeixun.com/plan/html/36.websocket-2.html
- 服务器端划分命名空间 
    可以把服务分成多个命名空间，默认/,不同空间内不能通信
```js
    io.on('connection', socket => {});
    io.of('/news').on('connection', socket => {});
```
- 客户端连接命名空间
```js
    let socket = io('http://localhost/');
    let socket = io('http://localhost/news');
```