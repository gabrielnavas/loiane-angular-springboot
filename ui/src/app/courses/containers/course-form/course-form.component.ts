import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit, AfterViewInit {
  form = this.formBuilder.group({
    id: ['',],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    category: ['', Validators.required]
  });

  categories = [
    { id: 'front-end', text: 'Front-end' },
    { id: 'back-end', text: 'Back-end' },
  ];

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;
  
  getErrorMessage(labelName: string, formName: string): string | undefined {
    const input = this.form.get(formName);
    if (input?.hasError('required')) {
      return `${labelName} é obrigatório`;
    }
    
    if (input?.hasError('minlength')) {
      const requiredLength = input.errors?.['minlength'].requiredLength;
      return `${labelName} deve ter no mínimo ${requiredLength} caracteres`;
    }
    
    if (input?.hasError('maxlength')) {
      const requiredLength = input.errors?.['maxlength'].requiredLength;
      return `${labelName} deve ter no máximo ${requiredLength} caracteres`;
    }
    
    return '';
  }

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly courseService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar,
    private readonly detectChangesRef: ChangeDetectorRef,
    private readonly title: Title,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initTitle()
    this.loadCourseEdit();
  }

  ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
    this.detectChangesRef.detectChanges();
  }

  onClickFinishForm() {
    if (this.form.value.id) {
      this.onClickEdit();
      this.onClickCancel();
    } else {
      this.onClickSave();
    }
  }

  onClickCancel() {
    this.location.back();
  }

  private onClickSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.courseService.save(this.form.value).subscribe({
        next: () => this.onSaveSuccess(),
        error: (err: Error) => this.onSaveError(err)
      })
    }
  }

  private onClickEdit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.courseService.edit(
        this.form.value.id!, {
        name: this.form.value.name,
        category: this.form.value.category,
      }).subscribe({
        next: () => this.onEditSuccess(),
        error: (err: Error) => this.onEditError(err)
      })
    }
  }

  private loadCourseEdit() {
    const course = this.route.snapshot.data['course'] as Course | undefined;
    if (course !== undefined) {
      const category = ['front-end', 'back-end'].find(category => category === course.category);
      this.form.setValue({
        id: course.id,
        name: course.name,
        category: category as string,
      })
    }
  }

  private onEditSuccess() {
    this.clearForm();
    this.nameInput.nativeElement.focus();
    this.showSnackMessage('Curso atualizado!');
  }

  private onEditError(err: Error): void {
    this.showModalMessage('Atenção!', 'Não foi possível atualizar o curso.')
  }

  private onSaveSuccess() {
    this.clearForm();
    this.nameInput.nativeElement.focus();
    this.showSnackMessage('Curso adicionado!');
  }

  private onSaveError(err: Error): void {
    this.showModalMessage('Atenção!', 'Não foi possível criar um novo curso.')
  }

  @HostListener('document:keydown.enter', ['$event'])
  private handleEnterKey(event: KeyboardEvent) {
    this.onClickSave();
  }

  @HostListener('document:keydown.esc', ['$event'])
  private handleEscKey(event: KeyboardEvent) {
    this.onClickCancel();
  }

  private showSnackMessage(message: string) {
    const config = { 
      duration: 5000, 
      verticalPosition: 'top', 
      horizontalPosition: 'right',
    } as MatSnackBarConfig;
    this.snack.open(message, "Fechar", config);
  }

  private showModalMessage(title: string, content: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        content: content
      }
    });
  }

  private clearForm() {
    this.form.reset({
      name: '',
      category: '',
    });
  }

  private initTitle() {
    this.title.setTitle('Curso | Novo curso')
  }
}
