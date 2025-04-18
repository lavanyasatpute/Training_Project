import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEventComponent } from './add-event/add-event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { JoinedEventComponent } from './joined-event/joined-event.component';
import { ButtonModule } from 'primeng/button';
import { CreatedEventComponent } from './created-event/created-event.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthGuard } from '../guard/auth.guard';
import { ProgressSpinnerModule } from 'primeng/progressspinner';




const route: Routes = [
  { path: '', redirectTo: 'event-list', pathMatch: "full" },

  { path: 'event-list', component: EventListComponent },
  { path: 'add-event', component: AddEventComponent,canActivate:[AuthGuard] },
  { path: 'join', component: JoinedEventComponent ,canActivate:[AuthGuard]},
  {path:'creted-event',component:CreatedEventComponent,canActivate:[AuthGuard]},
  {path:'tickets',component:EventDetailsComponent,canActivate:[AuthGuard]}

]


@NgModule({
  declarations: [
    EventDetailsComponent,
    AddEventComponent,
    JoinedEventComponent,
    EventListComponent,
    CreatedEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
    ButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ProgressSpinnerModule,
    MatProgressSpinnerModule
  ]
})
export class EventModule { }
