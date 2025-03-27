import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  {path:"user",loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
  {path:"event",loadChildren:()=>import('./event/event.module').then(m=>m.EventModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
