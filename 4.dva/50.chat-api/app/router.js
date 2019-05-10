'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  // https://eggjs.org/zh-cn/tutorials/socketio.html
  // 当服务器收到客户端的addMessage时间之后，会交给addMessage方法来处理
  // 向服务器发射一个新的消息，并且让服务器广播给所有的客户端
    io.route('addMessage', io.controller.room.addMessage);
    // 获取所有的历史消息
    io.route("getAllMessages", io.controller.room.getAllMessages);
};
