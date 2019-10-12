package com.boxing.maghnia.repository;
import com.boxing.maghnia.domain.Boxer;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Boxer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BoxerRepository extends JpaRepository<Boxer, Long> {

	Page<Boxer> findAllByFullNameContaining(String fullName,Pageable pageable);

	Page<Boxer> findAllByPhoneContaining(String phone, Pageable pageable);

	Page<Boxer> findAllByBirthDate(LocalDate birthDate, Pageable pageable);

}
