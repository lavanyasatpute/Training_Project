import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonRoutingModule } from './comman-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';

const ngPrimeModules = [ButtonModule, InputTextModule, CheckboxModule, DropdownModule, MultiSelectModule, RippleModule]
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    CommonRoutingModule,
    BrowserAnimationsModule,
  ],
  exports: [NavbarComponent,ngPrimeModules]
})
export class SharedModuleModule { }
