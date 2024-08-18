import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Course } from '../../model/course';
import { MatDialog } from '@angular/material/dialog';
import { CourseDetailsDialogComponent } from '../course-details-dialog/course-details-dialog.component';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {

  @Input() courses: Course[] = []
  @Input() isLoadingCourses = false;

  readonly displayedColumns: string[] = ['name', 'category', 'actions'];

  @Output('onClickSave') onClickSaveEmitt = new EventEmitter<void>();
  @Output('onClickEdit') onClickEditEmitt = new EventEmitter<Course>();
  @Output('onClickDelete') onClickDeleteEmitt = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog
  ) { }

  onClickNew() {
    this.onClickSaveEmitt.emit();
  }

  onClickEdit(course: Course) {
    this.onClickEditEmitt.emit(course);
  }

  onClickDelete(courseId: string) {
    this.onClickDeleteEmitt.emit(courseId);
  }

  onClickShowCourse(course: Course) {
    this.dialog.open(CourseDetailsDialogComponent, {
      data: course
    });
  }

  @HostListener('document:keydown.alt.n', ['$event'])
  private handleAltNKey(event: KeyboardEvent) {
    this.onClickNew();
  }
}
