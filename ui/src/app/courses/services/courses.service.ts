import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'http://localhost:8088/api/v1/courses'

  constructor(
    private http: HttpClient,
  ) { }

  save(course: Partial<Course>): Observable<void> {
    const body = { name: course.name, category: course.category };
    return this.http.post<void>(this.API, body);
  }

  edit(courseId: string, course: Partial<Course>): Observable<void> {
    const url = `${this.API}/${courseId}`;
    const body = { name: course.name, category: course.category };
    return this.http.patch<void>(url, body);
  }

  list(): Observable<Course[]> {
    const url = `${this.API}?page=0&size=10`;
    return this.http.get<Course[]>(url)
      .pipe(
        first(),// fecha a conexão e inscrições depois da primeira resposta
      );
  }

  getById(courseId: string): Observable<Course> {
    const url = `${this.API}/${courseId};`
    return this.http.get<Course>(url)
      .pipe(
        first(),
      )
  }

  delete(courseId: string): Observable<void> {
    const url = `${this.API}/${courseId};`
    return this.http.delete<void>(url)
      .pipe(
        first(),
      )
  }
}
