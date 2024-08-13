package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.category.Category;
import io.github.gabrielnavas.api.category.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CourseMapper {

    private final CategoryMapper categoryMapper;

    CourseResponse map(Course course, Category category) {
        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .category(categoryMapper.map(category))
                .build();
    }

    public Course map(CourseRequest request, Category category) {
        return Course.builder()
                .name(request.name())
                .category(category)
                .createdAt(LocalDateTime.now())
                .status("active")
                .build();
    }

    public CourseResponse map(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .category(categoryMapper.map(course.getCategory()))
                .build();
    }
}
