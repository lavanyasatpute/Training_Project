import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/Authentication/auth.service';
import { Router } from '@angular/router';
import { IUser, Role } from '../../model/user.interface';

@Component({
  selector: 'app-registration-form',
  standalone: false,
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  registerForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    ContactDetails: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, private router: Router) { }

  userRegistration() {
    // const userData: IUser = {
    //   Name: this.registerForm.value.Name || '',
    //   Email: this.registerForm.value.Email || '',
    //   Username: this.registerForm.value.Username || '',
    //   Password: this.registerForm.value.Password || '',
    //   ContactDetails: this.registerForm.value.ContactDetails || '0',
    //   role: this.registerForm.value.role as Role || Role.User // Adjust default role if necessary
    // };

    const userData: Partial<IUser> = {
      Name: this.registerForm.value.Name || '',
      Email: this.registerForm.value.Email || '',
      Username: this.registerForm.value.Username || '',
      Password: this.registerForm.value.Password || '',
      ContactDetails: this.registerForm.value.ContactDetails || '',
      role: this.registerForm.value.role as Role || Role.User
    };
    const result = this.authService.userRegistration(userData).subscribe((response:any) => {
      console.log("From registration comp: ",response.data +'\n' + response.messages);
    });
    console.log(result);
    
    
  }
}

