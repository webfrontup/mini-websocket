// Sec-WebSocket-Accept的计算 

const crypto = require("crypto");
const number = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const webSocketKey = "2OmD8gpkS9BB8/k7724Vxw==";
let websocketAccept = require("crypto")
	.createHash("sha1")
	.update(webSocketKey + number)
	.digest("base64");
console.log(websocketAccept); //c0P6IpJOX0v5V9uMNX/yytsX/Mg=
