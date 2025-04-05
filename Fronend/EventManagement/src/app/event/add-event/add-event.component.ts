import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../Services/event/event.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-add-event',
  standalone: false,
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'] // Corrected property name
})
export class AddEventComponent implements OnInit {
  eventForm!: FormGroup;
  LocationList: string[] = [];

  constructor(private fb: FormBuilder, private eventService: EventService, private sharedService: SharedService) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Schedule: ['', Validators.required],
      Location: ['', Validators.required],
      Categories: ['', Validators.required],
      CreatedBy: [null] // Default value set to null instead of empty array
    });

    // Preload user ID once to prevent repeated subscriptions
    this.sharedService.userId$.subscribe(id => {
      if (id) {
        this.eventForm.patchValue({ CreatedBy: id }); // Use patchValue for partial updates
      }
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      console.log("this is from event adding component:",this.eventForm.value);
      
      this.eventService.createEvent(this.eventForm.value).subscribe({
        next: (result: any) => console.log("Event Created Successfully:", result),
        error: (err: any) => console.error("Event Creation Failed:", err)
      });
    } else {
      console.warn("Form is invalid. Please check required fields.");
    }
  }
}
