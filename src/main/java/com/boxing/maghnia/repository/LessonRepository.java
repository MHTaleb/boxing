package com.boxing.maghnia.repository;
import com.boxing.maghnia.domain.Lesson;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Lesson entity.
 */
@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

    @Query(value = "select distinct lesson from Lesson lesson left join fetch lesson.boxers",
        countQuery = "select count(distinct lesson) from Lesson lesson")
    Page<Lesson> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct lesson from Lesson lesson left join fetch lesson.boxers")
    List<Lesson> findAllWithEagerRelationships();

    @Query("select lesson from Lesson lesson left join fetch lesson.boxers where lesson.id =:id")
    Optional<Lesson> findOneWithEagerRelationships(@Param("id") Long id);

}
