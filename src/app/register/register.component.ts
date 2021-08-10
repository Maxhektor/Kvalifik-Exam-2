import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserActions } from '../store/actions/UserActions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register', // name of component
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  // DI - Dependency injection
  constructor(private fb: FormBuilder, private router: Router,
              private userActions: UserActions, public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.hasError = null;
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
      }
    );
  }



  onSubmit(): void {
    this.userActions.signup(this.registerForm.value.username, this.registerForm.value.password);
  }
}
