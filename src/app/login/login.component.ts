import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserActions } from '../store/actions/UserActions';
import { AuthService} from '../auth.service';

@Component({
  selector: 'app-login', // name of component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  // DI - Dependency injection
  constructor(private fb: FormBuilder, private router: Router,
              private userActions: UserActions, public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.hasError = null;
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
      }
    );
  }


  onSubmit() {
    this.userActions.login(this.loginForm.value.username, this.loginForm.value.password);
  }
}
