import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router-redux';

import App from './Containers/App.jsx';
import events from './Reducers/reducer';

const store = createStore(
        events,
        {items: []}
);

class Root extends Component{
    render(){
        return(
            <Provider store={store}>
                <App />
            </Provider>    
        );
    }
}

render(<Root />, document.getElementById('container'));
