import {createAction,props} from '@ngrx/store'
export const INCREMENT=createAction('[counter component] Increment')
export const DECREMENT=createAction('[counter component] Decrement')
export const RESET=createAction('[counter component] Reset')

export const customIncrement=createAction("customIncrement",props<{count:number}>())
export const changeChannelName=createAction('changeName');