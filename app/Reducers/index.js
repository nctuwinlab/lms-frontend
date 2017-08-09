import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loginFormStatus from './Login';
import User from './User';
import navStatus from './Nav';
import routeTransition from './RouteTransition';
import routePath from './RoutePath';

export default combineReducers({
    isLogin: User,
    loginFormStatus,
    navStatus,
    routeTransition,
    routePath,
    routing: routerReducer,
});
