import { Component, Inject } from '@angular/core';
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

  closeDialog(): void {
    this.dialogRef.close();
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj).filter(key => key !== 'button' && key !== "eventId" && key !== "title"); // Exclude title if needed
  }
}


