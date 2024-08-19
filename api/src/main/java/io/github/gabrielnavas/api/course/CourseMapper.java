package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.category.CategoryMapper;
import io.github.gabrielnavas.api.lesson.LessonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CourseMapper {

    private final CategoryMapper categoryMapper;
    private final LessonMapper lessonMapper;

    public Course map(CourseRequest request) {
        return Course.builder()
                .name(request.name())
                .createdAt(LocalDateTime.now())
                .lessons(new ArrayList<>())
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

    public CoursePageResponse map(long totalElements, long totalPages, List<Course> courses) {
        return CoursePageResponse.builder()
                .totalElements(totalElements)
                .totalPages(totalPages)
                .courses(this.map(courses))
                .build();
    }

    private List<CourseResponse> map(List<Course> courses) {
        return courses.stream().map(this::map).toList();
    }
}
