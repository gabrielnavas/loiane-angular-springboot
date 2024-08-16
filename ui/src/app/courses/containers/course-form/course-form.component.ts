import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent implements OnInit, AfterViewInit {
  form!: FormGroup;

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
    private readonly detectChangesRef: ChangeDetectorRef,
    private readonly title: Title,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
    protected readonly formUtilsService: FormUtilsService
  ) { }

  ngOnInit(): void {
    this.initTitle()
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
    this.detectChangesRef.detectChanges();
  }

  get lessonsFormArray() {
    const lessonsForms = <UntypedFormArray>this.form.get('lessons')
    return lessonsForms.controls
  }

  onSubmit() {
    if (this.form.value.id) {
      this.onEdit();
      this.onClickCancel();
    } else {
      this.onSave();
    }
  }

  onClickCancel() {
    this.location.back();
  }


  includeLessonForm() {
    const lessonsForms = <UntypedFormArray>this.form.get('lessons');
    const emptyLesson = this.createLesson();
    lessonsForms.push(emptyLesson);
  }

  removeByIndexLessonForm(index: number) {
    const lessonsForms = <UntypedFormArray>this.form.get('lessons');
    lessonsForms.removeAt(index);
  }

  private retrieaveLessons(course: Course): FormGroup[] {
    const lessons = [] as FormGroup[]
    if (course?.lessons.length > 0) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      const emptyLesson = this.createLesson();
      lessons.push(emptyLesson)
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = {
    id: '',
    name: '',
    youtubeUrl: ''
  }): FormGroup {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      youtubeUrl: [lesson.youtubeUrl, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)
      ]],
    })
  }

  private onSave() {
    if (this.form.valid) {
      this.courseService.save(this.form.value).subscribe({
        next: () => this.onSaveSuccess(),
        error: (err: Error) => this.onSaveError(err)
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  private onEdit() {
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

  private initForm() {
    const course = this.route.snapshot.data['course'] as Course;

    // TODO: buscar no back do end
    let category = ['front-end', 'back-end'].find(category => category === course.category);
    if (category === undefined) {
      category = ''
    }

    this.form = this.formBuilder.group({
      id: ['',],
      name: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100)
      ]],
      category: ['', Validators.required],
      lessons: this.formBuilder.array(this.retrieaveLessons(course), [Validators.required])
    });
    console.log(this.form);
    console.log(this.form.value);
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
    this.onSave();
  }

  @HostListener('document:keydown.esc', ['$event'])
  private handleEscKey(event: KeyboardEvent) {
    this.onClickCancel();
  }

  @HostListener('document:keydown.alt.l', ['$event'])
  private handleAltL(event: KeyboardEvent) {
    this.includeLessonForm()
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
