import { ASIDE_TOGGLE } from '../Actions/action';
import LoginFormBg from '../Components/LoginFormBg';

function asideToggle(state = {}, action){
    switch(action.type){
        case ASIDE_TOGGLE:
            if(state.opened){
                return {
                    opened: false,
                    asideClass: 'form-in'
                }
            } else {
                return {
                    opened:  true,
                    asideClass: 'form-out',
                    bg: state.bg ? state.bg : new LoginFormBg()
                }
            }
            break;
        default:
            return state;
            break;
    }
}

export default asideToggle;

