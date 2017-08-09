import { ROUTECH } from '../Actions/action';

export default function routePath(state={}, action){
    switch(action.type){
        case ROUTECH:
            return Object.assign({}, state, {
                curId: action.id,
                curPath: state.routes[action.id].pathname
            });
            break;
        default:
            return state;
            break;
    }
}
