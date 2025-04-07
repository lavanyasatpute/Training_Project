import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-dialog',
  standalone: false,
  templateUrl: './generic-dialog.component.html',
  styleUrl: './generic-dialog.component.css'
})
export class GenericDialogComponent {



  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Record<string,any>
  ) {}

  closeDialog() {
    this.dialogRef.close();
    return "confirm"
  }
 

  // notCancelDialog(){
  //   this.dialogRef.close();
  // }

  objectKeys(obj: any): string[] {
    return Object.keys(obj).filter(key => key !== 'button' && key !== "eventId" && key !== "title"); // Exclude title if needed
  }
}





//-----------------------------------------------
// import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-dialog',
//   templateUrl: './dialog.component.html',
//   styleUrls: ['./dialog.component.css']
// })
// export class DialogComponent {
//   @Input() data: any = {};
//   @Output() close = new EventEmitter<void>();
//   @Output() confirm = new EventEmitter<any>();
  
//   selectedTicket: any;
  
//   constructor() { }
  
//   objectKeys(obj: any): string[] {
//     return Object.keys(obj);
//   }
  
//   closeDialog(): void {
//     this.close.emit();
//   }
  
//   notCancelDialog(): void {
//     this.confirm.emit(this.selectedTicket);
//   }
// }


