package com.boxing.maghnia.repository;
import com.boxing.maghnia.domain.Boxer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Boxer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BoxerRepository extends JpaRepository<Boxer, Long> {

}
