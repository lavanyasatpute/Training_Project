import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../Services/event/event.service';
import { SharedService } from '../../shared/shared.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-event',
  standalone: false,
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'] // Corrected property name
})
export class AddEventComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();
  @Output() eventCreated = new EventEmitter<any>();

  eventForm!: FormGroup;
  LocationList: string[] = [];
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private eventService: EventService, private sharedService: SharedService) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Schedule: ['', Validators.required],
      Location: ['', Validators.required],
      Categories: ['', Validators.required],
      CreatedBy: [null],
      regularPrice: [50, [Validators.required, Validators.min(0)]],
      vipPrice: [150, [Validators.required, Validators.min(0)]],
      vvipPrice: [300, [Validators.required, Validators.min(0)]],
      totalSeats: [100, [Validators.required, Validators.min(1)]]
    });


    // Preload user ID once to prevent repeated subscriptions
    this.sharedService.userId$.subscribe(id => {
      if (id) {
        this.eventForm.patchValue({ CreatedBy: id }); // Use patchValue for partial updates
      }
    });
  }

  onSubmit() {
    if (this.eventForm.invalid) {
      return;
    }

    this.isSubmitting = true;

    (this.eventService.createEvent(this.eventForm.value) as Observable<any>).subscribe({
      next: (event) => {
        this.isSubmitting = false;
        this.eventCreated.emit(event);
        this.closePopup();
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error creating event:', error);
      }
    });
  }

  closePopup(): void {
    this.close.emit(true);
  }
}
