import { NgRedux } from '@angular-redux/store';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { AppState } from './store/Store';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  public loggedIn = false;
  public hasError = null;

  constructor(private http: HttpClient,
              private ngRedux: NgRedux<AppState>,
              private router: Router){
    super();
  }


  getUserInfo(token: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + environment.apiKey;
    return this.http.post(url, {idToken: token}, this.getHttpOptions());
  }

   login(email: string, password: string): Observable<any>{
     const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey;
     this.http.post(url, {email, password, returnSecureToken: true},
       this.getHttpOptions()).pipe(catchError(this.handleError))
       .subscribe(user => {
       if (user) {
         this.hasError = null;
         this.loggedIn = true;
         this.router.navigate(['posts']);
       }
     }, error => {
       this.hasError = error;
       console.log(error);
     });

     return this.http.post(url, {email, password, returnSecureToken: true},
        this.getHttpOptions()).pipe(catchError(this.handleError));
   }


  signup(username: string, password: string): Observable<any> {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey;

    this.http.post(url, {email: username, password, returnSecureToken: true},
      this.getHttpOptions()).pipe(catchError(this.handleError)).subscribe( user => {
        if (user){
          this.hasError = null;
        }
    }, error => {
        this.hasError = error;
        this.router.navigate(['signup']);
        console.log(error);
    });
    return this.http.post<any>(url, {email: username, password, returnSecureToken: true},
      this.getHttpOptions()).pipe(catchError(this.handleError));
  }

  logout(){
    sessionStorage.removeItem('user');
    console.log('logging out');
    this.loggedIn = false;
    this.router.navigate(['posts']);
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'Unknown error occured';
    if (!errorResponse.error || !errorResponse.error.error){
      console.log('setting loggedin to false 1');
      this.hasError = errorMessage;
      this.loggedIn = false;
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'An account with this email already exists';
        this.hasError = errorMessage;
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Can\'t find account with this email / password combination';
        this.hasError = errorMessage;

        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Can\'t find account with this email / password combination';
        this.hasError = errorMessage;
        break;
    }
    this.hasError = errorMessage;
    return throwError(errorMessage);
  }
  public setIsLoggedIn(givenBoolean: boolean): void {
    if (givenBoolean === true){
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
}
