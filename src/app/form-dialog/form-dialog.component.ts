import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface PostControls {
  title: string;
  postImg: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostControls
  ) {}

  ngOnInit(): void {
    // const file:File = event.target.files[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
