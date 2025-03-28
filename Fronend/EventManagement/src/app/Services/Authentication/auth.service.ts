import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { IUser } from '../../model/user.interface';
import { API_URL } from '../../model/APIURL';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${API_URL}/users/`;

  userRegistration(userData: Partial<IUser>) {
    console.log(userData);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post(this.apiUrl + 'add', userData,{headers:headers})
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
