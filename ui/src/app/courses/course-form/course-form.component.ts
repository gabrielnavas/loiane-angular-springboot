import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  form: FormGroup;
  categories = [
    { id: 'front-end', text: 'Front-end' }, 
    { id: 'back-end', text: 'Back-end' },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly courseService: CoursesService,
    private readonly dialog: MatDialog
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      category: [''],
    })
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
    console.log(this.form.value.name);
    
    const course: Course = {
      id: "0",
      name: this.form.value.name,
      category: this.form.value.category,
    }
    this.courseService.save(course).subscribe({
      next: () => {
        this.clearForm();
      }
    })
  }

  private clearForm() {
    this.form.reset({
      name: '',
      category: '',
    });
  }
}
