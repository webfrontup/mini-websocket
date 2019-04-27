const net = require('net');
//我们是用在TCP协议去模拟这个Websocket协议，实现这个协议的升级过程
const server = net.createServer(function(socket){
    socket.on('data', function(data){ //data Buffer
        let headerStr = data.toString();
        //如果正则匹配，则意味着要升级协议
        //两个空行分隔 请求头和响应头
        if (/Upgrade: websocket/.test(headerStr)){
            let segments = headerStr.split('\r\n');//用换行符分隔成搓个字符串数组
            segments = segments.slice(1,-2);//去掉请求行和最后的二个空行
            //装配出请求头对象
            let headers = segments.reduce((current, header) => {
                let [key, value] = header.split(': ');
                current[key.toLocaleLowerCase()] = value;
                return current;
            },{});
            console.log(headers, headers["sec-websocket-version"],'version');
            if (headers['sec-websocket-version'] == "13"){
                let key = headers["sec-websocket-key"];
                let accept = sign(key);
                let response = [
                    'HTTP/1.1 101 Switching Protocols',
                    'Upgrade: websocket',
                    'Connection: Upgrade',
                    `Sec-WebSocket-Accept: ${accept}`,
                    '\r\n'
                ].join('\r\n')
                socket.end(response);
            }else{
                socket.end('error')
            }
        } else {
            socket.end("ERROR");
        }
    })
    socket.on('end', function() {
        socket.destroy();
    })
})
server.listen(9999)

const SECRET = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const crypto = require('crypto')
function sign(key) {
    return crypto.createHash("sha1").update(key + SECRET).digest('base64');
}

// node ws.js
// node 1.server.js
// http://www.zhufengpeixun.com/plan/html/36.websocket-1.html