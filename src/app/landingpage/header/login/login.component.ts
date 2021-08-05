import { Component } from '@angular/core';
import { UserInfo } from './user';
import { UserService } from 'src/app/user.service';
import { validateLogIn, validatePassword } from '../validations';
import { validateEmail } from '../validations';

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

  constructor(private userService: UserService) {}

  model = new UserInfo('', '');

  handleEmailChange() {
    if (validateEmail(this.model.email)) {
      this.validEmail = true;
      this.emailError = false;
    } else {
      this.validEmail = false;
      this.emailError = true;
    }
  }

  handlePasswordChange() {
    if (validatePassword(this.model.password)) {
      this.validPassword = true;
    } else {
      this.validPassword = false;
    }
  }

  handleLogIn() {
    const validLogIn = validateLogIn(this.model.email, this.model.password);
    if (validLogIn.valid) {
      this.userService.logIn(this.model.email, this.model.password).subscribe(
        (res) => {
          console.log(res);
          this.invalid = false;
          this.resendEmail = false;
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

  handleResendEmail() {
    this.userService.resendEmail(this.storedEmail).subscribe(
      (res) => {
        this.resendConfirmation = true;
        this.invalid = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
