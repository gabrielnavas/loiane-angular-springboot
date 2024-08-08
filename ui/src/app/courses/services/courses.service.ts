import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private http: HttpClient,
  ) { }

  list(): Course[] {
    return [{
      _id: '1',
      name: 'introduction on web',
      category: 'web'
    }, {
      _id: '2',
      name: 'introduction to sec',
      category: 'security'
    }];
  }
}
