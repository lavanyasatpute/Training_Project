import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { IUser } from '../../model/user.interface';
import { API_URL } from '../../model/APIURL';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private apiUrl = `${API_URL}/users/`;

  userRegistration(userData: Partial<IUser>): any {
    console.log(userData);
    if (userData.Name != '' &&
      userData.Email != '' &&
      userData.Username != '' &&
      userData.Password != '' &&
      userData.ContactDetails != ''
    ) {
      swal({
        title: "Registration Successful!",
        text: `Welcome, ${userData.Name}!`,
        icon: "success",
        buttons: {
          confirm: {
            text: "Proceed",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      });
      const headers = { 'Content-Type': 'application/json' };
      return this.http.post(this.apiUrl + 'add', userData, { headers: headers })
    } else {
      // Show error alert for invalid form data
      swal({
        title: "Invalid Input!",
        text: "Please ensure all fields are filled correctly.",
        icon: "error",
        buttons: {
          confirm: {
            text: "Try Again",
            value: true,
            visible: true,
            className: "",
            closeModal: true
          }
        }
      });
      return "Please enter a valid data..."
    }

  }

  loginUser(userData: Record<string, any>) {
    return this.http.post(this.apiUrl + 'login', userData).pipe(
      map((response: any) => {
        if (userData) {
          // Show confirmation alert for successful login
          swal({
            title: "Login Successfully..!",
            text: `Welcome, ${response.messages}`,
            icon: "success",
            buttons: {
              confirm: {
                text: "Proceed",
                value: true,
                visible: true,
                className: "",
                closeModal: true
              }
            }
          });
          if (response.Token) {
            console.log(response.messages);
            this.cookieService.set('userData', JSON.stringify(response), { expires: 1, path: '/' });
          }
          return response.messages;
        } else {
          // Show error alert for invalid form data
          swal({
            title: "Invalid Input!",
            text: "Please ensure all fields are filled correctly.",
            icon: "error",
            buttons: {
              confirm: {
                text: "Try Again",
                value: true,
                visible: true,
                className: "",
                closeModal: true
              }
            }
          });
        }

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
