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
      console.log('login valid');
    } else {
      this.invalid = true;
      this.errors = [];
      for (let i = 0; i < validLogIn.errors.length; i++) {
        let error = validLogIn.errors[i];
        this.errors.push(error);
      }
    }
  }
}
