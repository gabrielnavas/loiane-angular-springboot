package io.github.gabrielnavas.api.category;

import lombok.Builder;

import java.util.UUID;

@Builder
public record CategoryResponse(
        UUID id,
        String name
) {
}
