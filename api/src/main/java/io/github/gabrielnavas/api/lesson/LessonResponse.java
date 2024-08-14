package io.github.gabrielnavas.api.lesson;

import lombok.Builder;

import java.util.UUID;

@Builder
public record LessonResponse(
        UUID id,
        String name,
        String youtubeUrl
) {
}
