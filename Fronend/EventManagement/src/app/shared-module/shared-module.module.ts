import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonRoutingModule } from './comman-routing.module';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    CommonRoutingModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  exports:[NavbarComponent]
})
export class SharedModuleModule { }
