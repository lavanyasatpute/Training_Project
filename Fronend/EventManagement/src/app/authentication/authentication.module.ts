import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

import { ButtonModule } from 'primeng/button';

import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const route: Routes = [
  
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationFormComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'login', pathMatch: "full" }

]

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    RegistrationFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule.forChild(route),
    HttpClientModule
  ],
  exports: [LoginComponent, ProfileComponent]
})
export class AuthenticationModule { }
