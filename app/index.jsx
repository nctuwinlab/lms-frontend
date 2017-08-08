import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { routerMiddleware, ConnectedRouter } from 'react-router-redux';
import { createBrowserHistory, createHashHistory } from 'history';

import './css/index.scss';

import App from './Components/App.jsx';
import Reducers from './Reducers/index';

import routes from './Components/Routes/routes';

const borderPos = ['left', 'top', 'right', 'bottom', 'middle'];
const navItems = [
    {name: 'home', color: 'red'},
    {name: 'member', color: 'blue'}, 
    {name: 'food', color: 'orange'}, 
    {name: 'meeting', color: 'green'}, 
    {name: 'aboutus', color: 'gray'}
];

const browserHistory = createBrowserHistory({
    basename: location.pathname  
}); 

const store = createStore(
        Reducers,
        {
            loginFormStatus: {
                opened: false,
                asideClass: 'login-form form-in',
                firstOpened: false,
                firstOpenedAnime: false,
                borderClass: borderPos.map( p => {
                    return `login-input-border-${p} login-input-border`;
                }),
                maskClass: 'mask',
                labelClass: '',
                inputMaskClass: 'input-mask',
                
            },
            navStatus: navItems.map( (item, index) => {
                return {
                    name: item.name,
                    color: item.color,
                    id: index,
                    status: 'pre',
                }
            }),
            isLogin: 'false',
            routePath: {
                curId: 0,
                curPath: routes[0].pathname,
                routes
            }
        },
        applyMiddleware(routerMiddleware(browserHistory))
);

class Root extends Component{
    render(){
        return(
            <Provider store={store}>
                <ConnectedRouter history={browserHistory}>
                    <Route path="/" component={App}>
                    </Route>
                </ConnectedRouter>
            </Provider>    
        );
    }
}

render(<Root />, document.getElementById('container'));
