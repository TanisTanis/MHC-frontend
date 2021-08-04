import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { RegisterUser } from './userRegister';
import { validateRegister } from '../validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  formActive: boolean = true;
  confirmEmailText: boolean = false;
  invalid: boolean = false;
  errors: String[] = [];
  registered = false;
  confirmedPassword: String = '';
  passwordsDontMatch: boolean = false;

  firstNameComplete: boolean = false;
  lastNameComplete: boolean = false;
  emailComplete: boolean = false;
  passwordComplete: boolean = false;
  confirmPasswordComplete: boolean = false;
  phoneComplete: boolean = false;

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  model = new RegisterUser('', '', '', '', '');

  handleFirstNameChange() {
    let currentVal = this.model.firstName;
    if (currentVal.length > 1) {
      this.firstNameComplete = true;
    } else {
      this.firstNameComplete = false;
    }
  }

  handleLastNameChange() {
    let currentVal = this.model.lastName;
    if (currentVal.length > 1) {
      this.lastNameComplete = true;
    } else {
      this.lastNameComplete = false;
    }
  }

  handleEmailChange() {
    let currentVal = this.model.email;
    if (currentVal.length > 5) {
      this.emailComplete = true;
    } else {
      this.emailComplete = false;
    }
  }

  handlePasswordChange() {
    let currentVal = this.model.password;
    if (currentVal.length >= 5) {
      this.passwordComplete = true;
    } else {
      this.passwordComplete = false;
    }
  }

  handleConfirmPasswordChange() {
    const currentVal = (<HTMLInputElement>document.getElementById('password-confirm')).value;
    if (currentVal === this.model.password) {
      this.confirmPasswordComplete = true;
      this.passwordsDontMatch = false;
    } else {
      this.confirmPasswordComplete = false;
      this.passwordsDontMatch = true;
    }
  }

  handlePhoneChange() {
    let currentVal = this.model.phone;
    if (currentVal.length >= 10) {
      this.phoneComplete = true;
    } else {
      this.phoneComplete = false;
    }
  }

  handleRegister() {
    const confirmPassVal = (<HTMLInputElement>document.getElementById('password-confirm')).value;
    const validInputs = validateRegister(this.model.email, this.model.password, confirmPassVal, this.model.firstName, this.model.lastName, this.model.phone);

    if (validInputs.valid) {

      this.invalid = false;
      this.userService.addUser(this.model).subscribe(
          (data: any) => {
            this.confirmEmailText = true;
            this.formActive = false;
            this.registered = true;
        },
          (err) => {
            const message = err.error.message;
            this.invalid = true;
            this.errors.push(message);
        }
      )} else {

      this.invalid = true;
      this.errors = [];

      for (let i = 0; i < validInputs.errors.length; i++) {
        const error = validInputs.errors[i];
        this.errors.push(error);
      }
    }
  }
}
