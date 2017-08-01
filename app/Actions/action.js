export const CLICK = 'CLICK';
export const ASIDE_TOGGLE = 'ASIDE_TOGGLE'

export function clickEvt(text){
    return {type: CLICK, text}
}

export function asideToggle(){
    return {type: ASIDE_TOGGLE};
}

