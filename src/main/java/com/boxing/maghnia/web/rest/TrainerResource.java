package com.boxing.maghnia.web.rest;

import com.boxing.maghnia.domain.Trainer;
import com.boxing.maghnia.service.TrainerService;
import com.boxing.maghnia.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.boxing.maghnia.domain.Trainer}.
 */
@RestController
@RequestMapping("/api")
public class TrainerResource {

    private final Logger log = LoggerFactory.getLogger(TrainerResource.class);

    private static final String ENTITY_NAME = "trainer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrainerService trainerService;

    public TrainerResource(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    /**
     * {@code POST  /trainers} : Create a new trainer.
     *
     * @param trainer the trainer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trainer, or with status {@code 400 (Bad Request)} if the trainer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/trainers")
    public ResponseEntity<Trainer> createTrainer(@RequestBody Trainer trainer) throws URISyntaxException {
        log.debug("REST request to save Trainer : {}", trainer);
        if (trainer.getId() != null) {
            throw new BadRequestAlertException("A new trainer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Trainer result = trainerService.save(trainer);
        return ResponseEntity.created(new URI("/api/trainers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /trainers} : Updates an existing trainer.
     *
     * @param trainer the trainer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trainer,
     * or with status {@code 400 (Bad Request)} if the trainer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trainer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/trainers")
    public ResponseEntity<Trainer> updateTrainer(@RequestBody Trainer trainer) throws URISyntaxException {
        log.debug("REST request to update Trainer : {}", trainer);
        if (trainer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Trainer result = trainerService.save(trainer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trainer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /trainers} : get all the trainers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trainers in body.
     */
    @GetMapping("/trainers")
    public ResponseEntity<List<Trainer>> getAllTrainers(Pageable pageable) {
        log.debug("REST request to get a page of Trainers");
        Page<Trainer> page = trainerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /trainers/:id} : get the "id" trainer.
     *
     * @param id the id of the trainer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trainer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/trainers/{id}")
    public ResponseEntity<Trainer> getTrainer(@PathVariable Long id) {
        log.debug("REST request to get Trainer : {}", id);
        Optional<Trainer> trainer = trainerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trainer);
    }

    /**
     * {@code DELETE  /trainers/:id} : delete the "id" trainer.
     *
     * @param id the id of the trainer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/trainers/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long id) {
        log.debug("REST request to delete Trainer : {}", id);
        trainerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
