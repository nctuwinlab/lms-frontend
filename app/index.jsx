import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import './css/index.scss';

import App from './Components/App.jsx';
import Reducers from './Reducers/index';

const store = createStore(
        Reducers,
        {
            loginFormStatus: {
                opened: false,
                asideClass: 'login-form form-in',
                firstOpened: false,
                firstOpenedAnime: false,
                borderClass: ['left', 'top', 'right', 'bottom', 'middle'].map( p => {
                    return `login-input-border-${p} login-input-border`;
                }),
                maskClass: 'mask',
                labelClass: '',
                inputMaskClass: 'input-mask',
            },
            isLogin: 'false',
        }
);

const history = syncHistoryWithStore(createBrowserHistory(), store);

class Root extends Component{
    render(){
        return(
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                    </Route>
                </Router>
            </Provider>    
        );
    }
}

render(<Root />, document.getElementById('container'));
