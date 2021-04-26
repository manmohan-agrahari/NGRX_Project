import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { AuthResponseData } from '../models/authResponse.model'
import { User } from '../models/user.model'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any
  constructor(private http: HttpClient) {}
  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true },
    )
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIRBASE_API_KEY}`,
      { email, password, returnSecureToken: true },
    )
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + Number(data.expiresIn) * 1000,
    )
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate,
    )
    return user
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_EXISTS':
        return 'email already exists'
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found'
      case 'INVALID_PASSWORD':
        return 'Invalid Password'
      default:
        return 'Unknown error ocuured please try again...'
    }
  }
  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user))
    this.runTimeOutInterval(user)
  }
  runTimeOutInterval(user: User) {
    const todaysDate = new Date().getTime()
    const expirationDate =150000 //user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate
    this.timeoutInterval = setTimeout(() => {}, timeInterval)
  }
  logout(){
  localStorage.removeItem('userData')
   // write some more code here
  }
  getUserFromlocalStorage() {
    const userDataString = localStorage.getItem('userData')
    if (userDataString) {
      const userData = JSON.parse(userDataString)
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        userData.expirationDate,
      )
      this.runTimeOutInterval(user);
       return user;
    }
    return null;
  }
}
