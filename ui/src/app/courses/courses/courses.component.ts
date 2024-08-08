import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'category'];
  courses: Course[] = []

  constructor(
    private readonly coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.listCourses();
  }

  listCourses() {
    this.courses = this.coursesService.list();
  }
}
