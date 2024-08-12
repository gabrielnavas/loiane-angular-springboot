import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'; 


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    CategoryPipe,
  ]
})
export class SharedModule { }
