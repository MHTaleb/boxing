package com.boxing.maghnia.service.impl;

import com.boxing.maghnia.service.TrainerService;
import com.boxing.maghnia.domain.Trainer;
import com.boxing.maghnia.repository.TrainerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Trainer}.
 */
@Service
@Transactional
public class TrainerServiceImpl implements TrainerService {

    private final Logger log = LoggerFactory.getLogger(TrainerServiceImpl.class);

    private final TrainerRepository trainerRepository;

    public TrainerServiceImpl(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    /**
     * Save a trainer.
     *
     * @param trainer the entity to save.
     * @return the persisted entity.
     */
    @Override
    public Trainer save(Trainer trainer) {
        log.debug("Request to save Trainer : {}", trainer);
        return trainerRepository.save(trainer);
    }

    /**
     * Get all the trainers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Trainer> findAll(Pageable pageable) {
        log.debug("Request to get all Trainers");
        return trainerRepository.findAll(pageable);
    }


    /**
     * Get one trainer by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Trainer> findOne(Long id) {
        log.debug("Request to get Trainer : {}", id);
        return trainerRepository.findById(id);
    }

    /**
     * Delete the trainer by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Trainer : {}", id);
        trainerRepository.deleteById(id);
    }
}
