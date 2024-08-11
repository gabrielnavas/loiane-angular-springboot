import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  courses: Course[] = []
  isLoadingCourses = false;

  constructor(
    private readonly coursesService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly title: Title,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initTitle();
    this.listCourses();
  }

  onClickSave() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onClickEdit(course: Course) {
    this.router.navigate(['edit', course.id], { relativeTo: this.route });
  }

  onClickDelete(courseId: string) {
    console.log(courseId);
  }

  listCourses() {
    this.isLoadingCourses = true;
    this.coursesService.list().subscribe({
      next: courses => {
        this.courses = courses;
        this.isLoadingCourses = false;
      },
      error: err => {
        this.showMessage(
          'Atenção!',
          'contate o administrador do sistema!'
        );
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

  private initTitle() {
    this.title.setTitle('Curso | Lista de cursos')
  }
}
