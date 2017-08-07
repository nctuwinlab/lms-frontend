import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loginFormStatus from './Login';
import User from './User';
import navStatus from './Nav';

export default combineReducers({
    isLogin: User,
    loginFormStatus,
    navStatus,
    routing: routerReducer,
});
