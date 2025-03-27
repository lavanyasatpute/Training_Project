import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EventManagement';

  // ErrorFn(){
  //   throw new Error("This is a custom error message");
  // }
}
