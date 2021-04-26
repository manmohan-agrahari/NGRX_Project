import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from './auth.actions'
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth.service'
import { Store } from '@ngrx/store'
import { AppState } from 'src/app/store/app.state'
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/shared/shared.actions'
import { of } from 'rxjs'
import {Router}  from '@angular/router'
import { User } from 'src/app/models/user.model'

//effect is nothing but one type of service
@Injectable({
  providedIn: 'root',
})
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router:Router
  ) {}
  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }))
            this.store.dispatch(setErrorMessage({ message: '' }))
            const user = this.authService.formatUser(data)

            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user })
          }),
          catchError((errResp) => {
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message,
            )
            this.store.dispatch(setLoadingSpinner({ status: false }))
            return of(setErrorMessage({ message: errorMessage }))
          }),
        )
      }),
    )
  })

  //if u will keep dispatch false above create effect will not return any
  //observbles
  loginRedirect$=createEffect(()=>{
    return this.action$.pipe(ofType(loginSuccess), tap((action)=>{
      this.store.dispatch(setErrorMessage({message:''}))
      this.router.navigate(['/']);
    }))
  },{dispatch:false})

  signUp$=createEffect(()=>{
    return this.action$.pipe(ofType(signupStart),exhaustMap((action)=>
    {return this.authService.signUp(action.email,action.password).pipe(map((data)=>{
      this.store.dispatch(setLoadingSpinner({status:false}))
      const user=this.authService.formatUser(data);
      this.authService.setUserInLocalStorage(user);
      return signupSuccess({user});
    }),catchError((errResp) => {
      const errorMessage = this.authService.getErrorMessage(
        errResp.error.error.message,
      )
      this.store.dispatch(setLoadingSpinner({ status: false }))
      return of(setErrorMessage({ message: errorMessage }))
    })
    )
  })
  )
  })

  signupRedirect$=createEffect(()=>{
    return this.action$.pipe(ofType(signupSuccess), tap((action)=>{
      this.store.dispatch(setErrorMessage({message:''}))
      this.router.navigate(['/']);
    }))
  },{dispatch:false})


  autoLogin$=createEffect(()=>{
  return this.action$.pipe(
    ofType(autoLogin),
    mergeMap((action)=>{
    const user=this.authService.getUserFromlocalStorage();
    return of(loginSuccess({user}));

  }))
  })
  logout$= createEffect(()=>{
    return this.action$.pipe(ofType(autoLogout),map((action)=>{
    return  this.authService.logout();
    }))
  },{dispatch:false})
}
