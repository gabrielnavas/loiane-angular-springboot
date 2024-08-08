import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = '/assets/courses.json'

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<Course[]> {
    return this.http.get<Course[]>(this.API);
  }
}
