import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatToolbar} from '@angular/material/toolbar'; 
import {MatProgressSpinner} from '@angular/material/progress-spinner'; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatToolbar,
    MatProgressSpinner
  ],
  exports: [
    MatTableModule,
    MatCardModule,
    MatToolbar,
    MatProgressSpinner,
  ]
})
export class MaterialModule { }
