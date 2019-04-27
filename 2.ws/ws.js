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
            }
        } else {
            console.log(12345)
            let isFin = data[0] & (0b10000000 == 0b10000000); //判断是否为结束符
            const _opcode = data[0] & 0b00001111;//操作符
            const _isMast = data[1] & (0b10000000 == 0b10000000); //判断是否有掩码
            const _payloadLength = data[1] & 0b01111111; //数据的长度
            const _maskKey = data.slice(2,6); //截取maskKey
            const payload = data.slice(6)
            unmask(payload, _maskKey)
            console.log(payload.toString())
            const result = Buffer.alloc(2 + _payloadLength);
            result[0] = 0b10000010;
            result[1] = _payloadLength;
            payload.copy(result, 2)
            result[result.length-1] = 65
            socket.write(result);
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
// 掩码算法
//http://www.zhufengpeixun.com/plan/html/36.websocket-1.html#t182.4.2%20%E6%8E%A9%E7%A0%81%E7%AE%97%E6%B3%95
function unmask(payload, _maskKey){
    for(let i=0; i<payload.length; i++) {
        payload[i] ^= _maskKey[i % 4];
    }
}

// node ws.js
// node 1.server.js
// http://www.zhufengpeixun.com/plan/html/36.websocket-1.html