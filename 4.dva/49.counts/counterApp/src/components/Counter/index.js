import React from 'react';
import { connect } from 'dva';
import styles from './index.less';

// 此props为 connect传过来的值
const Counter = (props) => {
    let { current, record, dispatch }  = props
    // console.log(props,'props');
    return (
        <div className={styles.container}>
            <div className={styles.record}>
                最高分 {record}
            </div>
            <div className={styles.current}>
                {current}
            </div>
            <div className={styles.button}>
                <button onClick={() => dispatch({ type: 'count/add' })}>+</button>
            </div>
        </div>
    );
};

Counter.propTypes = {
};

export default connect(
    state => {
        return {
            current: state.count.current,
            record: state.count.record
        };
    }
)(Counter);
