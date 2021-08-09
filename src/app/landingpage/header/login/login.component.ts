import { Component } from '@angular/core';
import { UserInfo } from './user';
import { LoginService } from 'src/app/services/login.service';
import { validateLogIn, validatePassword } from '../validations';
import { validateEmail } from '../validations';
import { ValidationResponse } from '../validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  invalid: boolean = false;
  errors: String[] = [];
  validEmail: boolean = false;
  emailError: boolean = false;
  validPassword: boolean = false;

  resendEmail: boolean = false;
  storedEmail: string = '';
  resendConfirmation: boolean = false;

  constructor(private loginService: LoginService) {}

  model: UserInfo = new UserInfo('', '');

  handleEmailChange(): void {
    if (validateEmail(this.model.email)) {
      this.validEmail = true;
      this.emailError = false;
    } else {
      this.validEmail = false;
      this.emailError = true;
    }
  }

  handlePasswordChange(): void {
    if (validatePassword(this.model.password)) {
      this.validPassword = true;
    } else {
      this.validPassword = false;
    }
  }

  handleLogIn(): void {
    const validLogIn: ValidationResponse = validateLogIn(
      this.model.email,
      this.model.password
    );
    if (validLogIn.valid) {
      this.loginService.logIn(this.model.email, this.model.password).subscribe(
        (res) => {
          this.invalid = false;
          this.resendEmail = false;
          window.location.href = `/u/${res}/home`;
        },
        (err) => {
          console.log(err);

          if (
            err.error.message ===
            'Account has not been enabled yet. Please check your email to confirm.'
          ) {
            this.resendEmail = true;
            this.storedEmail = this.model.email;
          } else {
            this.resendEmail = false;
            this.storedEmail = '';
          }

          this.invalid = true;
          this.errors = [err.error.message];
        }
      );
    } else {
      this.invalid = true;
      this.errors = [];
      for (let i = 0; i < validLogIn.errors.length; i++) {
        let error = validLogIn.errors[i];
        this.errors.push(error);
      }
    }
  }

  handleResendEmail(): void {
    this.loginService.resendEmail(this.storedEmail).subscribe(
      (res): void => {
        this.resendConfirmation = true;
        this.invalid = false;
      },
      (err): void => {
        console.log(err);
      }
    );
  }
}
