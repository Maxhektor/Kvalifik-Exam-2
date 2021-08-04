import { NgRedux } from '@angular-redux/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { AppState } from './store/Store';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {

  constructor(private http: HttpClient, private ngRedux: NgRedux<AppState>) {
    super();
  }



  getUserInfo(token: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + environment.apiKey;

    return this.http.post(url, {idToken: token}, this.getHttpOptions());
  }

  login(email: string, password: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey;

    return this.http.post(url, {email, password, returnSecureToken: true},
      this.getHttpOptions());
  }

  signup(username: string, password: string) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey;
    console.log(url);
    return this.http.post(url, {email: username, password, returnSecureToken: true},
      this.getHttpOptions());
  }

}
