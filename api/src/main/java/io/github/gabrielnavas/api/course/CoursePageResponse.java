package io.github.gabrielnavas.api.course;

import lombok.Builder;

import java.util.List;

@Builder
public record CoursePageResponse(
        Long totalElements,
        Long totalPages,
        List<CourseResponse> courses
) {
}
