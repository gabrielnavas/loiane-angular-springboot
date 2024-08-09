import { Component, Inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

type DialogData = {
  title: string,
  content: string
}

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
