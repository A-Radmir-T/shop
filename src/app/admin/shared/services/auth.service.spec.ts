import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {IFbAuthResponse, IUser} from "../../../shared/interface";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {EMPTY, of} from "rxjs";

describe('AuthService', () => {
  let service: AuthService;
  const error = new HttpErrorResponse({error: {error: {message: ''}}})
  const user: IUser = {
    email: 'test@mail.ru',
    password: '123456'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthService);

  });

  it('should call http.post when called login()', () => {
    const http = TestBed.inject(HttpClient)
    const spy = spyOn(http, 'post').and.returnValue(of(EMPTY))
    service.login(user)
    expect(spy).toHaveBeenCalled()
  })

  it('should call service.setToken when called service.logout()', () => {
    spyOn(service, 'setToken')
    service.logout()
    expect(service.setToken).toHaveBeenCalledWith(null)
  })

  it('should return true if is authenticated when called isAuthenticated()', () => {
    spyOnProperty(service, 'token', 'get').and.returnValue('12')
    const result = service.isAuthenticated()
    expect(result).toBeTruthy()
  })

  it('should return false if not is authenticated when called isAuthenticated()', () => {
    spyOnProperty(service, 'token', 'get').and.returnValue(null)
    const result = service.isAuthenticated()
    expect(result).toBeFalsy()
  })

  it('should call localStorage.removeItem when setToken is called with null', () => {
    const spy = spyOn(window.localStorage, 'removeItem')
    service.setToken(null)
    expect(spy).toHaveBeenCalledWith('fb-token')
    expect(spy).toHaveBeenCalledWith('fb-expDate')
  })

  it('should call localStorage.setItem when called setToken', () => {
    const spy = spyOn(window.localStorage, 'setItem')
    service.setToken({
      idToken: '1',
      expiresIn: '3600'
    })
    expect(spy).toHaveBeenCalledWith('fb-token', '1')
  })

  it('should call error$.next when called handleError', () => {
    const spy = spyOn(service.error$, 'next')

    error.error.error.message = 'EMAIL_NOT_FOUND'
    service.handleError(error)
    expect(spy).toHaveBeenCalled()
  })

  it('should call error$.next when called handleError', () => {
    const spy = spyOn(service.error$, 'next')

    error.error.error.message = 'INVALID_PASSWORD'
    service.handleError(error)
    expect(spy).toHaveBeenCalled()
  })

  it('should call error$.next when called handleError', () => {
    const spy = spyOn(service.error$, 'next')
    error.error.error.message = 'INVALID_EMAIL'
    service.handleError(error)

    expect(spy).toHaveBeenCalled()

  })

  it('should return null if expired when get token', () => {
    service.logout()
    service.setToken({
      idToken: '1',
      expiresIn: '-3600'
    })
    const result = service.token

    expect(result).toBeNull()
  })

  it('should return token if not expired when get token', () => {
    service.logout()
    service.setToken({
      idToken: '1',
      expiresIn: '3600'
    })
    const result = service.token

    expect(result).toBe('1')
  })


});
