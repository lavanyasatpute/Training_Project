import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, throwError, Observable } from 'rxjs';
import { IUser } from '../../model/user.interface';
import { API_URL } from '../../model/APIURL';
import { CookieService } from 'ngx-cookie-service';
import swal from 'sweetalert';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${API_URL}/users`;

  constructor(private http: HttpClient, private cookieService: CookieService,private sharedService:SharedService) { }

  userRegistration(userData: Partial<IUser>): Observable<any> {
    console.log(userData);

    if (!userData.Name || !userData.Email || !userData.Username || !userData.Password || !userData.ContactDetails) {
      this.showAlert("Invalid Input!", "Please ensure all fields are filled correctly.", "error");
      return throwError(() => new Error("Invalid form data"));
    }

    this.showAlert("Registration Successful!", `Welcome, ${userData.Name}!`, "success");

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/add`, userData, { headers }).pipe(
      catchError(error => {
        console.error("Registration Error:", error);
        return throwError(() => new Error("Registration failed. Please try again."));
      })
    );
  }

  loginUser(userData: Record<string, any>): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData).pipe(
      map((response: any) => {
        console.log("Raw API Response:", response); // Debugging

        // Check if the response is undefined or an empty object
        if (!response || !("Token" in response)) {
          this.showAlert("Login Failed!", "No response from server. Please try again later.", "error");
          return throwError(() => new Error("No response received from backend"));
        }

        // Check if Token is empty (invalid credentials)
        if (!response.Token) {
          this.showAlert("Bad Credentials", "Invalid username or password. Please try again.", "error");
          return throwError(() => new Error("Invalid username or password"));
        }

        // If login is successful, show success alert
        this.showAlert("Login Successful!", `Welcome, ${response.messages}`, "success");

        // Store user data in cookies
        this.cookieService.set('userData', JSON.stringify(response), { expires: 1, path: '/' });

        //Update usar in shared service
        // this.sharedService.updateAuthState();

        return response.messages;
      }),
      catchError(error => {
        console.error("Login Error:", error);
        this.showAlert("Login Error", "An error occurred. Please try again.", "error");
        return throwError(() => new Error("Login Failed. Please try again."));
      })
    );
  }

  getAllUser(): Observable<any> {
    const userDataString = this.cookieService.get("userData");
  
    if (!userDataString) {
      console.error("No userData found in cookies.");
      return throwError(() => new Error("User not authenticated."));
    }
  
    let cookiesData;
    try {
      cookiesData = JSON.parse(userDataString);
    } catch (error) {
      console.error("Error parsing userData:", error);
      return throwError(() => new Error("Invalid cookie data."));
    }
  
    console.log("From AuthService getAllUser method:", cookiesData);
  
    const endpoint =
      cookiesData.role === "admin" 
        ? `${this.apiUrl}/alluser`
        : `${this.apiUrl}/filter/${cookiesData.id}`;
    
    console.log("From auth service: ",endpoint);
    
  
    return this.http.get(endpoint).pipe(
      catchError(error => {
        console.error("Fetch Users Error:", error);
        return throwError(() => new Error("Failed to fetch users. Please try again."));
      })
    );
  }
  



  private showAlert(title: string, text: string, icon: "success" | "error") {
    swal({
      title,
      text,
      icon,
      buttons: {
        confirm: {
          text: "OK",
          visible: true,
          closeModal: true
        }
      }
    });
  }
}
