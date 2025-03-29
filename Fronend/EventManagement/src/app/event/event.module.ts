import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const route: Routes = [
  
      { path: 'add-event', component: AddEventComponent },
      { path: '', redirectTo: 'add-event', pathMatch: "full" }

]


@NgModule({
  declarations: [
    EventDetailsComponent,
    AddEventComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route)
  ]
})
export class EventModule { }
