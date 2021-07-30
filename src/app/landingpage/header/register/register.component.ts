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

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  model = new RegisterUser('', '', '', '', '');

  handleRegister() {

    const validInputs = validateRegister(this.model.email, this.model.password, this.model.firstName, this.model.lastName, this.model.phone);

    if (validInputs.valid) {

      this.invalid = false;

      this.userService.addUser(this.model).subscribe(

        (data: String) => {
          console.log(data);

          this.confirmEmailText = true;
          this.formActive = false;

      }, (error) => {
        console.log(error);

        const message = error.error.text;
        this.invalid = true;
        this.errors.push(message);

      });
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
