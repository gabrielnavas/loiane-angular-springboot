import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CategoryUppercasePipe } from './pipes/category-uppercase.pipe';


@NgModule({
  declarations: [
    ErrorDialogComponent,
    CategoryPipe,
    ConfirmDialogComponent,
    CategoryUppercasePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    CategoryPipe,
    CategoryUppercasePipe,
  ]
})
export class SharedModule { }
