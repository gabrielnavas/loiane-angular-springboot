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

  save(course: Course): Observable<void> {
    const body = { name: course.name, category: course.category };
    return this.http.post<void>(this.API, body);
  }

  list(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.API}?page=0&size=10`)
      .pipe(
        first(),// fecha a conexão e inscrições depois da primeira resposta
        tap(
          courses => console.log(courses) // log data 
        )
      );
  }
}
