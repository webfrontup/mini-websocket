import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();
let delay = ms => new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms)
})

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require("./models/example").default);
app.model({
    namespace: 'count',
    state: {
        current: 0,
        record: 0
    },
    // 副作用对象，里面都是generator函数
    effects: {
        // effect有两个参数，第二个effects,可以解析出来call和put
        // call用来调用一个方法
        // put用来派发一个新的actions
        *add(actions, {call,put}) {
            yield call(delay, 1000); //1s后执行
            // 如果在model里派发动作的话，则不需要加namespace
            yield put({ type: 'minus'});
        }
    },
    // reducers是一个纯函数，不能有任何副作用
    // 相同输入一定会产生相同输出 在函数里面不能产生在外部可观察到的变化
    reducers: {
        add(state, action){
            let newCurrent = state.current+1;
            return {current: newCurrent, record: newCurrent>state.record?newCurrent:state.record};
        },
        minus(state, action) {
            let newCurrent = state.current - 1;
            return {...state, current: newCurrent };
        }
    }
});

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
