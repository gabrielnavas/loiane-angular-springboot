import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'http://localhost:8088/api/v1/courses?page=0&size=10'

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API)
    .pipe(
      first(),// fecha a conexão e inscrições depois da primeira resposta
      tap(
        courses => console.log(courses) // log data 
      )
    );
  }
}
