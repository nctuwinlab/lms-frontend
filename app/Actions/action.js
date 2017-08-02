export const CLICK = 'CLICK';
export const ASIDE_TOGGLE = 'ASIDE_TOGGLE';
export const ASIDE_OPEN_END = 'ASIDE_OPEN_END';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function clickEvt(text){
    return {type: CLICK, text}
}

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
