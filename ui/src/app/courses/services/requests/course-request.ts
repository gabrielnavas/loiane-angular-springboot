import { LessonRequest } from "./lesson-request";

export interface CourseRequest {
  name: string;
  categoryId: string;
  lessons: LessonRequest[];
}