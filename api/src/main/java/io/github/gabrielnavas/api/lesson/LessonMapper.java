package io.github.gabrielnavas.api.lesson;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LessonMapper {
    public LessonResponse map(Lesson lesson) {
        return LessonResponse.builder()
                .id(lesson.getId())
                .name(lesson.getName())
                .youtubeUrl(lesson.getYoutubeUrl())
                .build();
    }

    public List<LessonResponse> map(List<Lesson> lessons) {
        return lessons.stream().map(this::map).toList();
    }
}
