import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonModule
  ],
  exports:[LoginComponent,ProfileComponent]
})
export class AuthenticationModule { }
