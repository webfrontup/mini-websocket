### UmiJS
- https://umijs.org/zh/guide/getting-started.html#%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87
- 安装dva
```
    npm install -g dva-cli
    dva -v
    dva-h
```
- 创建新应用
```
    dva new counterApp -demo
    cd counterApp
    npm start
```
- 定义模型


### UmiJS
- https://umijs.org/zh/guide/getting-started.html#%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87
- 安装yarn
```
    # 国内源
    $ npm i yarn tyarn -g
    # 后面文档里的 yarn 换成 tyarn
    $ tyarn -v
```
- 安装umi
```
    $ yarn global add umi
    $ umi -v
    2.0.0
```
- 单文件创建
```
    umi g page index
```
- 然后启动本地服务器，
```
    umi dev
```
### 创建 umi 项目
```
    $ mkdir myapp && cd myapp
    $ yarn create umi
```

### 订阅键盘事件
subscription 语义是订阅，用于订阅一个数据源，然后根据条件dispatch需要的action。数据源可以是当前的时间、服务器的websocket连接、keyboard、geolocation变化、history路由变化等等
- keymaster
```js
subscriptions: {
    keyboard({dispatch}) {
        key('space', () => dispatch({type: 'add'}))
    }
}
```
