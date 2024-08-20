package io.github.gabrielnavas.api.course;

import io.github.gabrielnavas.api.category.Category;
import io.github.gabrielnavas.api.lesson.Lesson;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "courses")
@Getter
@Setter
@Builder
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@SQLDelete(sql = "UPDATE courses SET status = 'disabled' WHERE id = ?")
@SQLRestriction("status <> 'disabled'")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, length = 150)
    private String name;

    @ManyToOne
    private Category category;

    @Column(nullable = false, name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(nullable = false, length = 20)
    private String status;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Lesson> lessons = new ArrayList<>();

    public void addLesson(Lesson lesson) {
        lessons.add(lesson);
        lesson.setCourse(this);
    }

    public void addLessons(List<Lesson> lessons) {
        lessons.forEach(this::addLesson);
    }

    public void clearLessons() {
        this.lessons.clear();
    }
}
