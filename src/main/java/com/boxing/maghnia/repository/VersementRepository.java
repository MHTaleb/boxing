package com.boxing.maghnia.repository;
import com.boxing.maghnia.domain.Versement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Versement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VersementRepository extends JpaRepository<Versement, Long> {

}
