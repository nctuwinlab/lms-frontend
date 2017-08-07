import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loginFormStatus from './Login';
import User from './User';

export default combineReducers({
    isLogin: User,
    loginFormStatus,
    routing: routerReducer,
});
