import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:"user",loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule)},
  {path:"event",loadChildren:()=>import('./event/event.module').then(m=>m.EventModule)},
  {path:'',redirectTo:'event',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
