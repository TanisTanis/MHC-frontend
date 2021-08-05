import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterUser } from './landingpage/header/register/userRegister';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public addUser(user: RegisterUser): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/api/auth/signup`, user);
  }

  public logIn(email: string, password: string) {
    return this.http.post<Boolean>(`${this.apiServerUrl}/user/login`, {
      email: email,
      password: password,
    });
  }
}
