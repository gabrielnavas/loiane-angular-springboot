import { Course } from "../../model/course";

export interface CoursePageResponse {
  totalElements: number;
  totalPages: number;
  courses: Course[];
}