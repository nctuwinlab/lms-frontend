import { ASIDE_TOGGLE, ASIDE_OPEN_END } from '../Actions/action';

function asideStatus(state = {}, action){
    switch(action.type){
        case ASIDE_TOGGLE:
            if(state.opened){
                return Object.assign({}, state, {
                    opened: false,
                    asideClass: 'form-in',
                })
            } else {
                return Object.assign({}, state, {
                    opened:  true,
                    asideClass: 'form-out',
                    firstOpened: true
                })
            }
            break;
        case ASIDE_OPEN_END:
            if(state.firstOpenedAnime)
                return state;
            return Object.assign({}, state, {
                firstOpenedAnime: true
            })
            break;
        default:
            return state;
            break;
    }
}

export default asideStatus;

