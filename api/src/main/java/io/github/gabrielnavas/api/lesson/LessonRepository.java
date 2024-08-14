package io.github.gabrielnavas.api.lesson;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LessonRepository extends JpaRepository<Lesson, UUID> {
}
