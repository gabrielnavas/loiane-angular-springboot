import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.'

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API)
    .pipe(
      delay(2000), // mocked delay 2 seconds
      first(),// fecha a conexão e inscrições depois da primeira resposta
      tap(
        courses => console.log(courses) // log data 
      )
    );
  }
}
