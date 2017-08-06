import { LOGIN, LOGOUT, LOGINPENDING } from '../Actions/action';

function user(state = '', action){
    switch(action.type){
        case LOGIN:
            return 'true';
            break;
        case LOGOUT:
            return 'false';
            break;
        case LOGINPENDING:
            return 'pending';
            break;
        default:
            return state;
            break;
    }
}

export default user;


