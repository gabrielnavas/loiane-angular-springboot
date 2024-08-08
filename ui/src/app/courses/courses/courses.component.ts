import { Component } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  displayedColumns: string[] = ['name', 'category'];
  courses: Course[] = [{
    _id: '1',
    name: 'introduction on web',
    category: 'web'
  }, {
    _id: '2',
    name: 'introduction to sec',
    category: 'security'
  }]
}
