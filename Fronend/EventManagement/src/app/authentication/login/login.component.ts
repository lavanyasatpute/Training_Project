import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/Authentication/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed correct Angular syntax
})
export class LoginComponent {
  // Define the reactive form
  form = new FormGroup({
    username: new FormControl(null, [Validators.required]), // Email validation
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]) // Password validation
  });
  private messaga: any;
  constructor(private authService: AuthService) { }
  /**
   * @description
   * Method to handle form submission
   */
  submitForm() {
    this.authService.loginUser(this.form.value).subscribe(mess => {
      console.log(mess);

      this.messaga = mess
    })
    // Logging form value
    // console.log("Login Form Submission: ", this.form.value);

    // Check if the form is valid
  }
}
