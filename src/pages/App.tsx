import React, { lazy, Suspense } from 'preact/compat';

// import About from 'pages/about';
// import Users from 'pages/users';
// import Home from 'pages/home';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

/* 
注意使用lazy引入组件，export应该导出default,且路由组件都需要放在suspend里面
*/
const Home = lazy(() => import(/* webpackChunkName: 'Home'*/ './home'));
const About = lazy(() => import(/* webpackChunkName: 'About'*/ './about'));
const Users = lazy(() => import(/* webpackChunkName: 'Users'*/ './users'));
export interface HelloWorldProps {
    userName: string;
    lang: string;
}
export const App = (props: HelloWorldProps) => (
    <Suspense fallback={<div>Loading...</div>}>
        <Router>
            <Home path={'/'} />
            <About path="/about$" />
            <Users path="/users$" />
        </Router>
    </Suspense>
);
