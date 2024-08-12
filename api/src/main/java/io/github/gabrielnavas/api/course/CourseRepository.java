package io.github.gabrielnavas.api.course;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
    @Query("""
                SELECT c 
                FROM Course c
                WHERE status <> 'disabled'
                AND id = :courseId
            """)
    Optional<Course> findById(@Param("courseId") UUID courseId);

    @Modifying
    @Query("""
                UPDATE Course
                SET status = 'disabled'
                WHERE id = :courseId
            """)
    void deleteById(@Param("courseId") UUID courseId);

    @Query("""
                SELECT c 
                FROM Course c
                WHERE status <> 'disabled'
            """)
    Page<Course> findAll(Pageable page);
}
