import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserRes } from '../../core/models/user-res';

@Component({
  selector: 'app-request-detail-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './request-detail-modal.component.html',
  styleUrl: './request-detail-modal.component.scss'
})
export class RequestDetailModalComponent {
  constructor(
    public dialogRef: MatDialogRef<RequestDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public request: UserRes
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
