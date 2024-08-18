import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Observable, of } from 'rxjs';
import { Course } from '../model/course';

export const courseResolver: ResolveFn<Course> = (route, state): Observable<Course> => {
  const courseService = inject(CoursesService);

  if (route.params && route.params["course-id"]) {
    const courseId = route.params["course-id"] as string;
    return courseService.getById(courseId);
  }

  return of({ id: '', category: { id: '', name: '' }, name: '', lessons: [] } as Course);
};
