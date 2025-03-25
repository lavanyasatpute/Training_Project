import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { EventListEventDetailsComponent } from './event-list-event-details/event-list-event-details.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { FeedbackFormComponent } from './feedback/feedback-form/feedback-form.component';
import { ManagerFeedbackComponent } from './feedback/manager-feedback/manager-feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventListComponent,
    EventDetailsComponent,
    RegistrationFormComponent,
    FeedbackFormComponent,
    ManagerFeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
