import { render } from 'preact';

import { App } from './pages/App';

import { Provider } from 'react-redux';

import store from './store/index';
import React from 'preact/compat';
import preact from 'preact';

render(
    <Provider store={store}>
        <App userName=" fgdg" lang="TypeScript" />
    </Provider>,
    document.getElementById('output'),
);
