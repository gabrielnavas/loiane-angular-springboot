package io.github.gabrielnavas.api.course;

import lombok.Builder;

import java.util.UUID;

@Builder
public record CourseResponse(
        UUID id,
        String name,
        String category
) {
}
