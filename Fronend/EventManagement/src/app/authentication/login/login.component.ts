import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(20)])
  })

  submitForm(){
    console.log("Reactive Form => Submit Form: ",this.form.value);
    
  }

}
