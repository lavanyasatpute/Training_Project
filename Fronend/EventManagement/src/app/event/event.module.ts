import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JoinedEventComponent } from './joined-event/joined-event.component';
import { ButtonModule } from 'primeng/button';

const route: Routes = [
  { path: '', redirectTo: 'event-list', pathMatch: "full" },

  { path: 'event-list', component: EventListComponent },
  { path: 'add-event', component: AddEventComponent },
  { path: 'join', component: JoinedEventComponent }

]


@NgModule({
  declarations: [
    EventDetailsComponent,
    AddEventComponent,
    JoinedEventComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
    ButtonModule
  ]
})
export class EventModule { }
