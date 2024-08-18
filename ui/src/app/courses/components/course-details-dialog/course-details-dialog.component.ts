import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-details-dialog',
  templateUrl: './course-details-dialog.component.html',
  styleUrl: './course-details-dialog.component.scss'
})
export class CourseDetailsDialogComponent   {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Course) { }
}
