import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  standalone: false,
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  registerForm = new FormGroup({
    fullname: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(20)])
  })

  // constructor(private authService: AuthService, private router: Router) { }

  // userRegistration() {
  //   this.authService.userRegistration(this.registerForm.value).subscribe(
  //     (response) => {
  //       alert('Registration Successful!');
  //       console.log(response);
  //       this.router.navigate(['/']); // Navigate only on success
  //     },
  //     (error) => {
  //       alert('Registration Failed. Please try again.');
  //       console.error(error); // Handle errors properly
  //     }
  //   );
  // }

}
