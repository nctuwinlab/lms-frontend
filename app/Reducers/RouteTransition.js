import { ROUTEIN, ROUTEOUT } from '../Actions/action';

export default function(state='', action){
    switch(action.type){
        case ROUTEIN:
            return 'in';
            break;
        case ROUTEOUT:
            return 'out';
            break;
        default:
            return state;
    }
}
