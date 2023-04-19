import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";

import {IFbAuthResponse, IUser} from "../../../shared/interface";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error$: Subject<string> = new Subject<string>()
  constructor(
    private http: HttpClient
  ) {}

  get token(): string | null {
    const expDate = new Date(JSON.stringify(localStorage.getItem('fb-expDate')))
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token')
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout(): void {
    this.setToken(null)
  }

  login(user: IUser): Observable<any> {
    user.returnSecureToken = true
    return this.http.post<IFbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.fbApiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  handleError(error: HttpErrorResponse) {
    console.log('[HttpErrorResponse]', error)
    const {message} = error.error.error
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Введите правильный пароль')
        break
      case 'INVALID_EMAIL':
        this.error$.next('Введите корректный email')
        break
    }
    return throwError(() => error)
  }

  setToken(response: IFbAuthResponse | null): void {
    if (!response) {
      localStorage.removeItem('fb-token')
      localStorage.removeItem('fb-expDate')
      return
    }
    const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000).toString()
    localStorage.setItem('fb-token', response.idToken)
    localStorage.setItem('fb-expDate', expDate)
  }
}
