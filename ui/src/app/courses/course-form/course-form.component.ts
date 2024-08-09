import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements AfterViewInit {
  form: FormGroup;
  categories = [
    { id: 'front-end', text: 'Front-end' },
    { id: 'back-end', text: 'Back-end' },
  ];

  @ViewChild('nameInput') nameInput!: ElementRef<MatInput>;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly courseService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar,
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      category: [''],
    })

  }
  
  ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  onClickCancel() {
    this.router.navigate(['']);
  }

  showMessage(title: string, content: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        content: content
      }
    });
  }

  onClickSave() {
    const course: Course = {
      id: "0",
      name: this.form.value.name,
      category: this.form.value.category,
    }
    this.courseService.save(course).subscribe({
      next: () => {
        this.clearForm();
        this.nameInput.nativeElement.focus();
        this.snack.open('Curso criado!', '', { duration: 5000,  })
      },
      error: (err: Error) => this.showMessage('Atenção!', 'Não foi possível criar um novo curso.')
    })
  }

  private clearForm() {
    this.form.reset({
      name: '',
      category: '',
    });
  }
}
