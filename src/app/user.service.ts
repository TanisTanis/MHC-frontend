import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { RegisterUser } from "./landingpage/header/register/userRegister";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public addUser(user: RegisterUser): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/api/auth/signup`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/update/${user.id}`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }

  public logIn(email: string, password: string) {
    return this.http.post<Boolean>(`${this.apiServerUrl}/user/login`, {email: email, password: password});
  }
}