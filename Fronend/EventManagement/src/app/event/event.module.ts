import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';



@NgModule({
  declarations: [
    EventListComponent,
    EventDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EventModule { }
