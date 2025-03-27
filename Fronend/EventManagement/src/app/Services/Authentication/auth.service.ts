import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

interface IUser {
  fullname: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/user/';

  userRegistration(userData: IUser) {
    console.log(userData);
    return this.http.post(this.apiUrl + 'add-user', userData).pipe(
      catchError((error: any) => {
        console.error('Registration Error', error);
        return throwError(() => new Error("Registration Failed. Please try again."));
      })
    );
  }

  loginUser(userData: Record<string, string>) {
    return this.http.post(this.apiUrl + 'login', userData).pipe(
      map((response: any) => {
        if (response.token) {
          console.log(response.token);
          localStorage.setItem('usertoken', response.token);
        }
        return response;
      }),
      catchError((error: any) => {
        console.error('Login Error', error);
        return throwError(() => new Error("Login Failed. Please try again."));
      })
    );
  }

  getAllUser() {
    return this.http.get(this.apiUrl + 'get-users').pipe(
      catchError((error: any) => {
        console.error('Fetch Users Error', error);
        return throwError(() => new Error("Failed to fetch users. Please try again."));
      })
    );
  }
}
