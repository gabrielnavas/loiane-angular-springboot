import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, tap } from 'rxjs';
import { CourseRequest } from './requests/course-request';
import { CoursePageResponse } from './responses/course-page-response';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'http://localhost:8088/api/v1/courses'

  constructor(
    private http: HttpClient,
  ) { }

  save(request: CourseRequest): Observable<void> {
    const body = {
      name: request.name,
      categoryId: request.categoryId,
      lessons: request.lessons,
    };
    return this.http.post<void>(this.API, body);
  }

  edit(courseId: string, request: CourseRequest): Observable<void> {
    const url = `${this.API}/${courseId}`;
    const body = {
      name: request.name,
      categoryId: request.categoryId,
      lessons: request.lessons,
    };
    return this.http.patch<void>(url, body);
  }

  list(page: number = 0, size: number = 10): Observable<CoursePageResponse> {
    const url = `${this.API}?page=${page}&size=${size}`;
    return this.http.get<CoursePageResponse>(url)
      .pipe(
        first(),
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
