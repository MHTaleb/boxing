package com.boxing.maghnia.repository;
import com.boxing.maghnia.domain.Trainer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Trainer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {

}
