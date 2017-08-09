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
    {   name: 'home', 
        color: 'red', 
        image: 'https://static.pexels.com/photos/307847/pexels-photo-307847.jpeg'
    },
    {
        name: 'member', 
        color: 'blue', 
        image: 'https://www.efsa.europa.eu/sites/default/files/All%20staff%20picture%20new.jpg'
    }, 
    {
        name: 'food', 
        color: 'orange', 
        image: 'http://d3pah2c10lnl36.cloudfront.net/images/menu_detail_lunch_02_.jpg'
    }, 
    {
        name: 'meeting', 
        color: 'green', 
        image: 'https://www.bsr.org/images/sized/images/thumbnails/2016-10-24-member-spotlight-axa-blog-thumb-400x300.jpg'
    }, 
    {
        name: 'aboutus', 
        color: 'gray', 
        image: 'http://www.solutionsgranted.com/wp-content/uploads/2015/08/AdobeStock_69470996-About-Us.jpeg'
    }
];

const browserHistory = createBrowserHistory({
    basename: location.pathname+'#'
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
                    image: item.image,
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
