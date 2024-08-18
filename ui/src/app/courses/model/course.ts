import { Category } from "./category";
import { Lesson } from "./lesson";

export interface Course {
  id: string;
  name: string;
  category: Category;
  lessons: Lesson[];
}
