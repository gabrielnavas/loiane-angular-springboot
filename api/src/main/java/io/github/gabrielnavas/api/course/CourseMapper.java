package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.category.Category;
import io.github.gabrielnavas.api.category.CategoryMapper;
import io.github.gabrielnavas.api.lesson.Lesson;
import io.github.gabrielnavas.api.lesson.LessonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CourseMapper {

    private final CategoryMapper categoryMapper;
    private final LessonMapper lessonMapper;

    public Course map(CourseRequest request, Category category, List<Lesson> lessons) {
        return Course.builder()
                .name(request.name())
                .category(category)
                .createdAt(LocalDateTime.now())
                .lessons(lessons)
                .status("active")
                .build();
    }

    public CourseResponse map(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .category(categoryMapper.map(course.getCategory()))
                .lessons(lessonMapper.map(course.getLessons()))
                .build();
    }
}
