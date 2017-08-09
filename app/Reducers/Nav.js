import { NAVHOVER, NAVLEAVE } from '../Actions/action';

export default function navStatus(state=[], action){
    switch(action.type){
        case NAVHOVER:
            return state.map(item => {
                if(item.id < action.id)
                    item.status = 'pre';
                else if(item.id > action.id)
                    item.status = 'next';
                else
                    item.status = 'cur';
                return item;
            });
            break;
        case NAVLEAVE:
            return state.map(item => {
                item.status = 'cur' == item.status?'pre':item.status;
                return item;
            });
            break;
        default:
            return state;
    }
}
