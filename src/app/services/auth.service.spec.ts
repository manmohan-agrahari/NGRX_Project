import { HttpClient } from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { environment } from '../../environments/environment'
import { AuthResponseData } from '../models/authResponse.model'
import { AuthService } from './auth.service'

describe('Auth Service', () => {
  let httpClient: HttpClient
  let httpTestCtrl: HttpTestingController
  let authService: AuthService
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    })
  })
  beforeEach(() => {
    authService = TestBed.inject(AuthService)
    httpTestCtrl = TestBed.inject(HttpTestingController)
  })

  it('should test login httpPost', (done) => {
    const url= `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`
    const testResponsePost1: AuthResponseData = {
      idToken: '1',
      email: 'xyz@gmail.com',
      refreshToken: 'xyzse4%',
      expiresIn: '30',
      localId: '123',
      registered: true,
      kind: 'auth',
    }
    const email="xyz@gmail.com"
    const password="123456"
    // this subscribe will not trigger now
    authService.login(email, password).subscribe((res)=>{
      expect(testResponsePost1).toBe(res) //it should check the mock data
      done();
    })
    //Expect that a single request has been made which matches the given URL, and return its mock.
    const req=httpTestCtrl.expectOne(url)

    //whether the request was cancelled after it was sent
    expect(req.cancelled).toBeFalsy()

    //expect request is post type
    expect(req.request.method).toBe('POST')

    //expect request reponsetype is 'json'
    expect(req.request.responseType).toBe('json')

    //flush method will resolve by returning a body plus extra http information
    /**
     * Resolve the request by returning a body plus additional HTTP information
     * (such as response headers) if provided. If the request specifies an expected
     * body type, the body is converted into the requested type. Otherwise, the body
     * is converted to JSON by default.
     *
     */
    req.flush(testResponsePost1)
    //once this flush method is executed  the subscribe of Login() will be executed aswell
  })


  it('should test signup httpPost', (done) => {
    const url= `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIRBASE_API_KEY}`
    const testResponsePost1: AuthResponseData = {
      idToken: '1',
      email: 'xyz@gmail.com',
      refreshToken: 'xyzse4%',
      expiresIn: '30',
      localId: '123',
      registered: true,
      kind: 'auth',
    }
    const email="xyz@gmail.com"
    const password="123456"
    authService.signUp(email, password).subscribe((res)=>{
      expect(testResponsePost1).toBe(res) //it should check the mock data
      done();
    })
    const req=httpTestCtrl.expectOne(url)
    expect(req.cancelled).toBeFalsy()
    expect(req.request.method).toBe('POST')
    expect(req.request.responseType).toBe('json')
    req.flush(testResponsePost1)
  })
})
