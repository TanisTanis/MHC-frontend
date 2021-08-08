import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { RegisterUser } from './userRegister';
import { validateRegister } from '../validations';
import { ValidationResponse } from '../validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formActive: boolean = true;
  confirmEmailText: boolean = false;
  invalid: boolean = false;
  errors: String[] = [];
  registered: boolean = false;
  confirmedPassword: String = '';
  passwordsDontMatch: boolean = false;

  firstNameComplete: boolean = false;
  lastNameComplete: boolean = false;
  emailComplete: boolean = false;
  passwordComplete: boolean = false;
  confirmPasswordComplete: boolean = false;
  phoneComplete: boolean = false;

  constructor(private loginService: LoginService) {
    this.loginService = loginService;
  }

  model: RegisterUser = new RegisterUser('', '', '', '', '');

  handleFirstNameChange(): void {
    let currentVal = this.model.firstName;
    if (currentVal.length > 1) {
      this.firstNameComplete = true;
    } else {
      this.firstNameComplete = false;
    }
  }

  handleLastNameChange(): void {
    let currentVal = this.model.lastName;
    if (currentVal.length > 1) {
      this.lastNameComplete = true;
    } else {
      this.lastNameComplete = false;
    }
  }

  handleEmailChange(): void {
    let currentVal = this.model.email;
    if (currentVal.length > 5) {
      this.emailComplete = true;
    } else {
      this.emailComplete = false;
    }
  }

  handlePasswordChange(): void {
    let currentVal = this.model.password;
    if (currentVal.length >= 5) {
      this.passwordComplete = true;
    } else {
      this.passwordComplete = false;
    }
  }

  handleConfirmPasswordChange(): void {
    const currentVal = (<HTMLInputElement>(
      document.getElementById('password-confirm')
    )).value;
    if (currentVal === this.model.password) {
      this.confirmPasswordComplete = true;
      this.passwordsDontMatch = false;
    } else {
      this.confirmPasswordComplete = false;
      this.passwordsDontMatch = true;
    }
  }

  handlePhoneChange(): void {
    let currentVal = this.model.phone;
    if (currentVal.length >= 10) {
      this.phoneComplete = true;
    } else {
      this.phoneComplete = false;
    }
  }

  handleRegister(): void {
    const confirmPassVal = (<HTMLInputElement>(
      document.getElementById('password-confirm')
    )).value;
    const validInputs: ValidationResponse = validateRegister(
      this.model.email,
      this.model.password,
      confirmPassVal,
      this.model.firstName,
      this.model.lastName,
      this.model.phone
    );

    if (validInputs.valid) {
      this.invalid = false;
      this.loginService.addUser(this.model).subscribe(
        (data: any): void => {
          this.confirmEmailText = true;
          this.formActive = false;
          this.registered = true;
        },
        (err): void => {
          const message: string = err.error.message;
          this.invalid = true;
          this.errors.push(message);
        }
      );
    } else {
      this.invalid = true;
      this.errors = [];

      for (let i = 0; i < validInputs.errors.length; i++) {
        const error = validInputs.errors[i];
        this.errors.push(error);
      }
    }
  }
}
