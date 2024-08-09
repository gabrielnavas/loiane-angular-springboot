import { Component, HostListener, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category', 'actions'];
  courses: Course[] = []
  isLoadingCourses = false;

  constructor(
    private readonly coursesService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listCourses();
  }

  listCourses() {
    this.isLoadingCourses = true;
    this.coursesService.list().subscribe({
      next: courses => {
        this.courses = courses;
        this.isLoadingCourses = false;
      },
      error: err => {
        this.showMessage('Atenção!', 'contate o administrador do sistema!')
      }
    });
  }

  showMessage(title: string, content: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        content: content
      }
    });
  }

  @HostListener('document:keydown.alt.n', ['$event'])
  private handleAltNKey(event: KeyboardEvent) {
    this.onClickNew();
  }

  onClickNew() {
    // rota relativa a atual
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onClickActionEdit(course: Course) {
    console.log(course);
  }

  onClickDelete(courseId: string) {
    console.log(courseId);
  }
}
