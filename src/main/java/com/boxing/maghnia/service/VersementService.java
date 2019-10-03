package com.boxing.maghnia.service;

import com.boxing.maghnia.domain.Versement;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Versement}.
 */
public interface VersementService {

    /**
     * Save a versement.
     *
     * @param versement the entity to save.
     * @return the persisted entity.
     */
    Versement save(Versement versement);

    /**
     * Get all the versements.
     *
     * @return the list of entities.
     */
    List<Versement> findAll();


    /**
     * Get the "id" versement.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Versement> findOne(Long id);

    /**
     * Delete the "id" versement.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
