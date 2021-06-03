import styles from './index.scss';
import React from 'preact/compat';

export interface HelloWorldProps {
    userName?: string;
    lang?: string;
}
export default (props) => {
    console.log(process.env, 'dsfgs');
    console.log(props, 'props');
    return (
        <div>
            <img src={require('assets/a.jpg')} />
            <div>qqqqqqqq</div>
            <div className={styles.users}>这是users谢谢大V查下页面</div>
        </div>
    );
};
