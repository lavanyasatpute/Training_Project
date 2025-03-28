import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed correct Angular syntax
})
export class LoginComponent {
  // Define the reactive form
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]), // Email validation
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]) // Password validation
  });

  /**
   * @description
   * Method to handle form submission
   */
  submitForm() {
    
    // Logging form value
    console.log("Login Form Submission: ", this.form.value);

    // Check if the form is valid
    if (this.form.valid) {
      // Show confirmation alert for successful login
      swal({
        title: "Login Successful!",
        text: `Welcome, ${this.form.value.email}!`,
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
  }
}
