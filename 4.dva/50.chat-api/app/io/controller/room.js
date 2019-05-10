const {Controller} = require('egg')
class RoomController extends Controller {
    async addMessage() {
        console.log("addMessage");
        let {ctx, app} = this;
        // ctx.args 是消息的参数，就是一个数组，是客户端emit除了事件类型之外的其他参数
        let message = ctx.args.join(','); // args=['nihao','吗']
        // 在服务器把收到的消息广播给所有的客户端
        // app.io.emit('messageAdded', message)
        await ctx.socket.broadcast.emit("messageAdded", message);
    }
    async getAllMessages() {
        console.log("getAllMessages");
    }
}
module.exports = RoomController;