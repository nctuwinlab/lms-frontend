import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';

import './materialize-css/js/materialize.min.js';
import './materialize-css/css/materialize.min.css';
import './css/index.scss';

import App from './Containers/App.jsx';
import Reducers from './Reducers/index';

const store = createStore(
        Reducers,
        {
            items: [],
            asideStatus: {
                opened: false,
                asideClass: '',
                bg: null
            }
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
