import { combineReducers } from 'redux';
import { CLICK } from '../Actions/action';

function items(state = [], action){
    switch(action.type){
        case CLICK:
            console.log('clicked');
            console.log(state);
            return [
                ...state,
                {text: action.text}
            ];
            break;
        default:
            return state;
            break;
    }
}

const events = combineReducers({
    items, 
});

export default events;
