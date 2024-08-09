import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  @Input() courses: Course[] = []
  @Input() isLoadingCourses = false;

  displayedColumns: string[] = ['name', 'category', 'actions'];
  
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  onClickNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onClickActionEdit(course: Course) {
    console.log(course);
  }

  onClickDelete(courseId: string) {
    console.log(courseId);
  }

  @HostListener('document:keydown.alt.n', ['$event'])
  private handleAltNKey(event: KeyboardEvent) {
    this.onClickNew();
  }
}
