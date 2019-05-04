var express = require("express");
var path = require("path");
var app = express(); //其实是一个监听函数
//使用静态文件中间件，把当前目录下面的public目录作为静态文件根目录
// http://localhost:8080/index.html
app.use(express.static(path.resolve(__dirname,'public')));
// app.get('/socket.io/socket.io.js', function(req,res) {
//     res.sendFile(path.resolve('node_modules','socket.io-client','client.js'))
// })


//创建一个http服务器对象
const server = require('http').createServer(app);
// 因为socket.io握手要依赖http服务器
let io = require('socket.io')(server);
// 监听客户端传过来的连接
io.of("/dev").on("connection", function(socket) {
	console.log("客户端已经连接");
	// 监听socket的message时间来监听客户端传过来的信息
	socket.on("message", function(message) {
		console.log(message);
		// socket.send('server:' + message);
		// 向所有的客户端进行广播，所有的连接上此服务器的客户端都能
		// socket.emit('message', '服务器你好');

        // 向所有的/dev客户端进行广播，所有的连接上此服务器的客户端都能收到消息
        // 广播有两种，一种是包含自己，一种是不包含自己
        // io.of("/dev").emit("message", message); //自己发消息，自己也发给自己
        socket.broadcast.emit("message", message);

	});
});
io.of('/chat').on('connection', function (socket) {
    console.log('客户端已经连接');
    let roomName;
    // 监听socket的message时间来监听客户端传过来的信息
    socket.on('message', function (message) {
        console.log(message);
        // socket.send('server:' + message);
        // 向所有的客户端进行广播，所有的连接上此服务器的客户端都能
        // socket.emit('message', '服务器你好');

        // 向所有的/chat客户端进行广播，所有的连接上此服务器的客户端都能收到消息
        // io.of("/chat").emit("message", message); //自己发消息，自己也发给自己
        // socket.broadcast.emit("message", message); //自己发消息，不发给自己
        // 向/chat命名空间内，roomName房间内的所有人广播
        io.of("/chat").in(roomName).emit("message", message); //自己发消息，自己也发给自己

    })
    // 监听客户端想进入 某个房间的事件
    // 客户端在进入多个房间且没有触发离开事件时，相当于他同时处在了多个房间中
    socket.on('join', function (name) {
        // 如果进入某个房间内了，则说话时，只有在该房间内的人才能听到
        roomName = name;
        // socket的join方法可以用来进入某个房间
        socket.join(name); //先开个房间，然后进入房间
    })
    // 监听离开房间
    socket.on("leave", function(name) {
        // leave方法是定死的，表示离开某个房间
        socket.leave(name);
        roomName=null;
    });
})
server.listen(8082)

// app.get("/", function(req, res) {
// 	res.sendFile(path.resolve("index.html"));
// });

// var server = require("http").createServer(app);
// var io = require("socket.io")(server);

// io.on("connection", function(socket) {
// 	console.log("客户端已经连接");
// 	socket.on("message", function(msg) {
// 		console.log(msg);
// 		socket.send("sever:" + msg);
// 	});
// });
// server.listen(80);

// 操作步骤，node解析该文件之后，分别打开多个窗口，且地址均为 http://localhost:8082/chat.html
// 在输入框内输入信息在发送。。。。。。。