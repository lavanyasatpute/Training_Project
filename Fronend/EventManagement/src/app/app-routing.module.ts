import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { EventListComponent } from './event/event-list/event-list.component';

const routes: Routes = [
  {path:"user",loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
  {path:"event",loadChildren:()=>import('./event/event.module').then(m=>m.EventModule)},
  {path:'event-list',component:EventListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
