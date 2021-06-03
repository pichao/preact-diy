import React from 'preact/compat';
import styles from './index.scss';
import { Link } from 'preact-router/match';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
// import A from 'pages/'
export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}

const Home = (props) => {
    console.log(process.env, 'dsfgs');
    console.log(props);
    const selectedData = useSelector((state) => {
        console.log(state, 'stateyyyyyyyyyyyyy');
        return state;
    }, shallowEqual) as any;
    console.log(selectedData, 'selectedData');
    const dispatch = useDispatch();
    return (
        <div>
            <div>
                <Link href={'/about$'}>about</Link>
                <Link href={'/users$'}>users</Link>
            </div>
            <button
                onClick={() => {
                    // dispatch({
                    //     type: 'rotate',
                    //     payload: {
                    //         per_page: 2,
                    //     },
                    // });
                }}
            >
                发action
            </button>
            {/* {selectedData.showAlert ? <div>这里验证发送action</div> : null} */}
            <img src={require('assets/a.jpg')} />
            <div className={styles.home}>这是home页面</div>
        </div>
    );
};
export default Home;
