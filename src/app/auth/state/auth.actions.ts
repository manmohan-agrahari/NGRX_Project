import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/posts.model";
import { User } from "src/app/models/user.model";


export const LOGIN_START ='[auth page] login start';
export const LOGIN_SUCCESS ='[auth page] login success';
export const LOGIN_FAIL ='[auth page] login fail';
export const ADD_POST_ACTION='[post page] add post';
export const ADD_POST_SUCCESS='[post page] add post success'

export const SIGNUP_START='[auth page] signup start';
export const SIGNUP_SUCCESS='[auth page] signup success';
export const AUTO_LOGIN_ACTION='[auth page] auto login';
export const LOGOUT_ACTION='[auth page] logout';

export const loginStart=createAction(LOGIN_START,props<{email:string;password:string}>());
export const loginSuccess=createAction(LOGIN_SUCCESS,props<{user:User}>());
export const loginFail=createAction(LOGIN_FAIL);

export const signupStart= createAction(SIGNUP_START,props<{email:string; password:string}>())
export const signupSuccess=createAction(SIGNUP_SUCCESS,props<{user:User}>())

export const autoLogin=createAction(AUTO_LOGIN_ACTION);
export const autoLogout=createAction(LOGOUT_ACTION);

export const addPost=createAction(ADD_POST_ACTION, props<{post:Post}>());
export const addPostSuccess=createAction(ADD_POST_SUCCESS, props<{post:Post}>());



