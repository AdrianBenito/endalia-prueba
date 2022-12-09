import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'alert-warning',
  templateUrl: './alert-warning.component.html',
  styleUrls: ['./alert-warning.component.scss'],
})
export class AlertWarningComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AlertWarningComponent>
  ) {}

  onClose() {
    this.dialogRef.close();
  }
}
