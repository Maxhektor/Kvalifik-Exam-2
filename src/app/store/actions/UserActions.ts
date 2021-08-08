import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from './../Store';
import { AuthService} from './../../auth.service';
import { User } from 'src/app/entities/User';

@Injectable({ providedIn: 'root'})
export class UserActions {

    constructor(private ngRedux: NgRedux<AppState>, private authService: AuthService)
    {}

  static SIGNED_UP = 'SIGNED_UP';
  static LOGGED_IN = 'LOGGED_IN';


  login(username: string, password: string): void {

    this.authService.login(username, password).subscribe((result: any) => {
        const user: User = {
          id: result.localId,
          username, email: username,
          signupDate: undefined
        } as User;


        this.authService.getUserInfo(result.idToken).subscribe((response: any) => {
          console.log('getUserInfo');
          console.log(response);
          sessionStorage.setItem('loggedUser', username);
          user.signupDate = new Date(Number(response.users[0].createdAt));
          this.ngRedux.dispatch({
            type: UserActions.LOGGED_IN,
            payload: {user, token: result.idToken}
          });
        });
      });
  }

  signup(username: string, password: string): void {
    this.authService.signup(username, password).subscribe((res: any) => {
        console.log('3 after getting a reponse');
        console.log(res);
        const user: User = {
          id: res.localId,
          username, email: username,
          signupDate: new Date()
        } as User;

        this.ngRedux.dispatch({
          type: UserActions.SIGNED_UP,
          payload: {user, token: res.idToken}
      });
    });
    console.log('before getting a reponse');
  }

}
