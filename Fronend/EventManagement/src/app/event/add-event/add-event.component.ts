import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../Services/event/event.service';

@Component({
  selector: 'app-add-event',
  standalone: false,
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  eventForm!: FormGroup;
  LocationList :string[]=[]
  constructor(private fb: FormBuilder,private eventService:EventService) {}

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
      this.eventService.createEvent(this.eventForm.value).subscribe((result:any)=>{
        console.log(result);
      });
      console.log("Event Data:", this.eventForm.value);
      // alert("Event Created Successfully!");
    }
  }

}
