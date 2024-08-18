import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { first, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly API = 'http://localhost:8088/api/v1/categories'

  constructor(
    private readonly http: HttpClient,
  ) { }

  list(): Observable<Category[]> {
    const url = `${this.API}?page=0&size=10`;
    return this.http.get<Category[]>(url)
      .pipe(
        first(),  
      );
  }
}
