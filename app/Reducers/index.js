import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import Items from './Items';
import asideStatus from './Aside';
import User from './User';

export default combineReducers({
    items: Items,
    isLogin: User,
    asideStatus,
    routing: routerReducer,
});
