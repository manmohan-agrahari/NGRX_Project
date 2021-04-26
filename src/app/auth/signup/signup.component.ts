import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AppState } from 'src/app/store/app.state'
import {Store } from '@ngrx/store'
import { setLoadingSpinner } from 'src/app/shared/shared.actions'
import { signupStart } from '../state/auth.actions'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup

  constructor(private store:Store<AppState>) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }
  onSignUpSubmit() {
    if (!this.signUpForm.valid) {
    }
    const email=this.signUpForm.value.email;
    const password=this.signUpForm.value.password;
    this.store.dispatch(setLoadingSpinner({status:true}))
    this.store.dispatch(signupStart({email,password}))
  }


}
