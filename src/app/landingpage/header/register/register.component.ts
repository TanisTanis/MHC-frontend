import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { RegisterUser } from './userRegister';
import { validateRegister } from '../validations';
import { User } from 'src/app/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  invalid = false;
  errors: String[] = [];

  constructor(private userService: UserService) {}

  model = new RegisterUser('', '', '', '', '');

  handleRegister() {
    const validInputs = validateRegister(this.model.email, this.model.password, this.model.firstName, this.model.lastName, this.model.phone);
    if (validInputs.valid) {
      this.invalid = false;
      this.userService.addUser(this.model)
    } else {
      this.invalid = true;
      this.errors = [];
      for (let i = 0; i < validInputs.errors.length; i++) {
        let error = validInputs.errors[i];
        this.errors.push(error);
      }
    }
  }

}
