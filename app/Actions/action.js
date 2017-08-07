export const ASIDE_TOGGLE = 'ASIDE_TOGGLE';
export const ASIDE_OPEN_END = 'ASIDE_OPEN_END';
export const BORDER_IN = 'BORDER_IN';
export const BORDER_OUT = 'BORDER_OUT';
export const FORM_IN = 'FORM_IN';
export const FORM_OUT = 'FORM_OUT';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGINPENDING = 'LOGINPENDING';

export const NAVHOVER = 'NAVHOVER';
export const NAVLEAVE = 'NAVLEAVE';

export function asideToggle(){
    return {type: ASIDE_TOGGLE};
}

export function asideOpenEnd(){
    return {type: ASIDE_OPEN_END};
}

export function login(){
    return {type: LOGIN};
}

export function logout(){
    return {type: LOGOUT};
}

export function pending(){
    return {type: LOGINPENDING};
}

export function border(dir, pos){
    return 'in'==dir?
        {type: BORDER_IN, pos}:
        {type: BORDER_OUT, pos};
}

export function form(dir){
    return 'in' == dir?
        {type: FORM_IN}:
        {type: FORM_OUT};
}

export function navHover(id){
    return {
        type: NAVHOVER,
        id,
    }
}

export function navLeave(){
    return {
        type: NAVLEAVE,
    }
}
