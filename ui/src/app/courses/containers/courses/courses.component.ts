import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
    private readonly detectChangesRef: ChangeDetectorRef,
    private readonly snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initTitle();
    this.listCourses();
    this.detectChangesRef.detectChanges();
  }

  onClickSave() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onClickEdit(course: Course) {
    this.router.navigate(['edit', course.id], { relativeTo: this.route });
  }

  onClickDelete(courseId: string) {
    this.coursesService.delete(courseId)
      .subscribe({
        next: () => {
          this.showSnackMessage("Curso removido!");
          this.removeCourseFromList(courseId);
        },
        error: err => this.showModalMessage(
          'Atenção!',
          'contate o administrador do sistema!'
        )
      });
  }

  private listCourses() {
    this.isLoadingCourses = true;
    this.coursesService.list().subscribe({
      next: courses => {
        this.courses = courses;
        this.isLoadingCourses = false;
      },
      error: err => {
        this.showModalMessage(
          'Atenção!',
          'contate o administrador do sistema!'
        );
      }
    });
  }

  private showModalMessage(title: string, content: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        content: content
      }
    });
  }

  private showSnackMessage(message: string) {
    const config = { 
      duration: 5000, 
      verticalPosition: 'top', 
      horizontalPosition: 'right',
    } as MatSnackBarConfig;
    this.snack.open(message, "Fechar", config);
  }

  private removeCourseFromList(courseId: string) {
    this.courses = this.courses.filter(course => course.id !== courseId);
  }

  private initTitle() {
    this.title.setTitle('Curso | Lista de cursos')
  }
}
