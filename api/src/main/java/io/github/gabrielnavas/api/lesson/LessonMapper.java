package io.github.gabrielnavas.api.lesson;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

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

    public List<Lesson> mapToLessons(List<LessonRequest> lessons) {
        return lessons.stream().map(lessonRequest -> Lesson.builder()
                .id(UUID.randomUUID())
                .name(lessonRequest.name())
                .youtubeUrl(lessonRequest.youtubeUrl())
                .build()).toList();
    }

    public Lesson map(LessonRequest lessonRequest) {
        Lesson lesson = new Lesson();
        lesson.setName(lessonRequest.name());
        lesson.setYoutubeUrl(lessonRequest.youtubeUrl());
        return lesson;
    }
}
