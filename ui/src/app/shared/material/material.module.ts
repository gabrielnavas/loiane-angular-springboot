import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbar } from '@angular/material/toolbar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbar,
    MatProgressSpinner,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    MatTableModule,
    MatCardModule,
    MatToolbar,
    MatProgressSpinner,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class MaterialModule { }
