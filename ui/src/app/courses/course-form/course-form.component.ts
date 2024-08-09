import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements AfterViewInit {
  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    category: ['', Validators.required]
  });

  categories = [
    { id: 'front-end', text: 'Front-end' },
    { id: 'back-end', text: 'Back-end' },
  ];

  @ViewChild('nameInput') nameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly courseService: CoursesService,
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar,
    private readonly cdr: ChangeDetectorRef,
    private readonly title: Title,
    private readonly location: Location,
  ) {
    this.initTitle()
  }

  ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
    this.cdr.detectChanges(); // Força a detecção de mudanças após a view ter sido inicializada
  }

  onClickCancel() {
    this.location.back();
  }

  onClickSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marcar todos os campos como "tocados"
      return;
    } else {
      this.courseService.save(this.form.value).subscribe({
        next: () => this.onSaveSuccess(),
        error: (err: Error) => this.onSaveError(err)
      })
    }
  }

  private onSaveSuccess() {
    this.clearForm();
    this.nameInput.nativeElement.focus();
    this.snack.open('Curso criado!', '', { duration: 5000, })
  }

  private onSaveError(err: Error): void {
    this.showMessage('Atenção!', 'Não foi possível criar um novo curso.')
  }

  @HostListener('document:keydown.enter', ['$event'])
  private handleEnterKey(event: KeyboardEvent) {
    this.onClickSave();
  }

  @HostListener('document:keydown.esc', ['$event'])
  private handleEscKey(event: KeyboardEvent) {
    this.onClickCancel();
  }

  private showMessage(title: string, content: string) {
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
