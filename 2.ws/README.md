
### 请求头
```js
GET ws://localhost:8888/ HTTP/1.1
Host: localhost:8888
Connection: Upgrade
Upgrade: websocket
Origin: http://localhost:3100
Sec-WebSocket-Version: 13
Sec-WebSocket-Key: 2OmD8gpkS9BB8/k7724Vxw==
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```
### 响应头
```js
HTTP/1.1 101 Switching Protocols //转换协议
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: c0P6IpJOX0v5V9uMNX/yytsX/Mg=
```



