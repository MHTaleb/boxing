package com.boxing.maghnia.service.impl;

import com.boxing.maghnia.service.VersementService;
import com.boxing.maghnia.domain.Versement;
import com.boxing.maghnia.repository.VersementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

/**
 * Service Implementation for managing {@link Versement}.
 */
@Service
@Transactional
public class VersementServiceImpl implements VersementService {

    private final Logger log = LoggerFactory.getLogger(VersementServiceImpl.class);

    private final VersementRepository versementRepository;

    public VersementServiceImpl(VersementRepository versementRepository) {
        this.versementRepository = versementRepository;
    }

    /**
     * Save a versement.
     *
     * @param versement the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Versement save(Versement versement) {
        log.debug("Request to save Versement : {}", versement);
        return versementRepository.save(versement);
    }

    /**
     * Get all the versements.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Versement> findAll(Pageable pageable) {
        log.debug("Request to get all Versements");
        return versementRepository.findAll(pageable);
    }


    /**
     * Get one versement by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Versement> findOne(Long id) {
        log.debug("Request to get Versement : {}", id);
        return versementRepository.findById(id);
    }

    /**
     * Delete the versement by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Versement : {}", id);
        versementRepository.deleteById(id);
    }

    @Override
    public Set<Versement> findAllVersementOfBoxer(Long id) {
        log.debug("calling versement repository method with boxer id ");
        return versementRepository.findAllByBoxerId(id);
    }
}
