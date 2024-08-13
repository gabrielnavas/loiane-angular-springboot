package io.github.gabrielnavas.api.course;

import org.springframework.stereotype.Service;

@Service
public class CourseMapper {

    CourseResponse map(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .name(course.getName())
                .category(course.getCategory())
                .build();
    }
}
