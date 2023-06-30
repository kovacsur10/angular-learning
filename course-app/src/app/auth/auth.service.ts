import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

export interface AuthResponseData {
  kind?: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
    }));
  }

  logout() {
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
    localStorage.removeItem('userData');
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDate);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => { this.logout(); }, expirationDuration);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occured!';
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "The email exists already!";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "The email does not exist!";
        break;
      case 'INVALID_PASSWORD':
        errorMessage = "The password is invalid!";
        break;
    }
    return throwError(() => errorMessage);
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

}