import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  standalone: false,
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  eventForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.eventForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Schedule: ['', Validators.required],
      Location: ['', Validators.required],
      Categories: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      console.log("Event Data:", this.eventForm.value);
      alert("Event Created Successfully!");
    }
  }

}
