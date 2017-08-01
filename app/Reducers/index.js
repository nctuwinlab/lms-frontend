import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import Items from './Items';
import asideToggle from './Aside';

export default combineReducers({
    items: Items,
    asideStatus: asideToggle,
    routing: routerReducer,
});
