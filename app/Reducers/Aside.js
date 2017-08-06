import { 
    ASIDE_TOGGLE, 
    ASIDE_OPEN_END, 
    BORDER_IN, 
    BORDER_OUT,
    FORM_IN,
    FORM_OUT
} from '../Actions/action';

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
        case BORDER_IN:
            return Object.assign({}, state, {
                borderClass: action.pos.map(p => {
                    return `login-input-border-${p} login-input-border in`;
                })
            })
            break;
        case BORDER_OUT:
            return Object.assign({}, state, {
                borderClass: action.pos.map(p => {
                    return `login-input-border-${p} login-input-border`;
                })
            })
            break;
        case FORM_IN:
            return Object.assign({}, state, {
                maskClass: 'mask in',
                labelClass: 'in',
                inputMaskClass: 'input-mask in',
            })
            break;
        case FORM_OUT:
            return Object.assign({}, state, {
                maskClass: 'mask',
                labelClass: '',
                inputMaskClass: 'input-mask',
            })
            break;
        default:
            return state;
            break;
    }
}

export default asideStatus;

