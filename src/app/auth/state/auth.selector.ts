import { createFeatureSelector, createSelector } from "@ngrx/store"
import { AuthState } from "./auth.state"

export  const Auth_STATE_NAME='auth'

const  getAuthState=createFeatureSelector<AuthState>(Auth_STATE_NAME)
export const isAuthenticated=createSelector(getAuthState,(state)=>{
  return state.user?  true:false;
})
