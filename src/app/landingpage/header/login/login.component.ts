import { Component } from '@angular/core';
import { UserInfo } from './user';
import { UserService } from 'src/app/user.service';
import { validateLogIn } from '../validations';
import { validate } from 'json-schema';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalid: boolean = false;
  errors: String[] = [];


  constructor(private userService: UserService) {
  }

  model = new UserInfo('', '');

  handleLogIn() {
    console.log(this.model);
    const validLogIn = validateLogIn(this.model.email, this.model.password);
    if (validLogIn.valid) {
      console.log('login valid')
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
