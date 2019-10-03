package com.boxing.maghnia.web.rest;

import com.boxing.maghnia.BoxingApp;
import com.boxing.maghnia.domain.Trainer;
import com.boxing.maghnia.repository.TrainerRepository;
import com.boxing.maghnia.service.TrainerService;
import com.boxing.maghnia.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.boxing.maghnia.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TrainerResource} REST controller.
 */
@SpringBootTest(classes = BoxingApp.class)
public class TrainerResourceIT {

    private static final String DEFAULT_FULL_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FULL_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_BIRTH_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_BIRTH_DATE = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_BIRTH_DATE = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private TrainerService trainerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTrainerMockMvc;

    private Trainer trainer;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrainerResource trainerResource = new TrainerResource(trainerService);
        this.restTrainerMockMvc = MockMvcBuilders.standaloneSetup(trainerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trainer createEntity(EntityManager em) {
        Trainer trainer = new Trainer()
            .fullName(DEFAULT_FULL_NAME)
            .birthDate(DEFAULT_BIRTH_DATE)
            .phone(DEFAULT_PHONE);
        return trainer;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trainer createUpdatedEntity(EntityManager em) {
        Trainer trainer = new Trainer()
            .fullName(UPDATED_FULL_NAME)
            .birthDate(UPDATED_BIRTH_DATE)
            .phone(UPDATED_PHONE);
        return trainer;
    }

    @BeforeEach
    public void initTest() {
        trainer = createEntity(em);
    }

    @Test
    @Transactional
    public void createTrainer() throws Exception {
        int databaseSizeBeforeCreate = trainerRepository.findAll().size();

        // Create the Trainer
        restTrainerMockMvc.perform(post("/api/trainers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainer)))
            .andExpect(status().isCreated());

        // Validate the Trainer in the database
        List<Trainer> trainerList = trainerRepository.findAll();
        assertThat(trainerList).hasSize(databaseSizeBeforeCreate + 1);
        Trainer testTrainer = trainerList.get(trainerList.size() - 1);
        assertThat(testTrainer.getFullName()).isEqualTo(DEFAULT_FULL_NAME);
        assertThat(testTrainer.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
        assertThat(testTrainer.getPhone()).isEqualTo(DEFAULT_PHONE);
    }

    @Test
    @Transactional
    public void createTrainerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trainerRepository.findAll().size();

        // Create the Trainer with an existing ID
        trainer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrainerMockMvc.perform(post("/api/trainers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainer)))
            .andExpect(status().isBadRequest());

        // Validate the Trainer in the database
        List<Trainer> trainerList = trainerRepository.findAll();
        assertThat(trainerList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTrainers() throws Exception {
        // Initialize the database
        trainerRepository.saveAndFlush(trainer);

        // Get all the trainerList
        restTrainerMockMvc.perform(get("/api/trainers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trainer.getId().intValue())))
            .andExpect(jsonPath("$.[*].fullName").value(hasItem(DEFAULT_FULL_NAME.toString())))
            .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())));
    }
    
    @Test
    @Transactional
    public void getTrainer() throws Exception {
        // Initialize the database
        trainerRepository.saveAndFlush(trainer);

        // Get the trainer
        restTrainerMockMvc.perform(get("/api/trainers/{id}", trainer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(trainer.getId().intValue()))
            .andExpect(jsonPath("$.fullName").value(DEFAULT_FULL_NAME.toString()))
            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTrainer() throws Exception {
        // Get the trainer
        restTrainerMockMvc.perform(get("/api/trainers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTrainer() throws Exception {
        // Initialize the database
        trainerService.save(trainer);

        int databaseSizeBeforeUpdate = trainerRepository.findAll().size();

        // Update the trainer
        Trainer updatedTrainer = trainerRepository.findById(trainer.getId()).get();
        // Disconnect from session so that the updates on updatedTrainer are not directly saved in db
        em.detach(updatedTrainer);
        updatedTrainer
            .fullName(UPDATED_FULL_NAME)
            .birthDate(UPDATED_BIRTH_DATE)
            .phone(UPDATED_PHONE);

        restTrainerMockMvc.perform(put("/api/trainers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTrainer)))
            .andExpect(status().isOk());

        // Validate the Trainer in the database
        List<Trainer> trainerList = trainerRepository.findAll();
        assertThat(trainerList).hasSize(databaseSizeBeforeUpdate);
        Trainer testTrainer = trainerList.get(trainerList.size() - 1);
        assertThat(testTrainer.getFullName()).isEqualTo(UPDATED_FULL_NAME);
        assertThat(testTrainer.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
        assertThat(testTrainer.getPhone()).isEqualTo(UPDATED_PHONE);
    }

    @Test
    @Transactional
    public void updateNonExistingTrainer() throws Exception {
        int databaseSizeBeforeUpdate = trainerRepository.findAll().size();

        // Create the Trainer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrainerMockMvc.perform(put("/api/trainers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(trainer)))
            .andExpect(status().isBadRequest());

        // Validate the Trainer in the database
        List<Trainer> trainerList = trainerRepository.findAll();
        assertThat(trainerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTrainer() throws Exception {
        // Initialize the database
        trainerService.save(trainer);

        int databaseSizeBeforeDelete = trainerRepository.findAll().size();

        // Delete the trainer
        restTrainerMockMvc.perform(delete("/api/trainers/{id}", trainer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Trainer> trainerList = trainerRepository.findAll();
        assertThat(trainerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trainer.class);
        Trainer trainer1 = new Trainer();
        trainer1.setId(1L);
        Trainer trainer2 = new Trainer();
        trainer2.setId(trainer1.getId());
        assertThat(trainer1).isEqualTo(trainer2);
        trainer2.setId(2L);
        assertThat(trainer1).isNotEqualTo(trainer2);
        trainer1.setId(null);
        assertThat(trainer1).isNotEqualTo(trainer2);
    }
}
