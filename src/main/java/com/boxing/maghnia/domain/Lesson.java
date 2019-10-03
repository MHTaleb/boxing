package com.boxing.maghnia.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Lesson.
 */
@Entity
@Table(name = "lesson")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lesson implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "detail")
    private String detail;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "hour")
    private Instant hour;

    @ManyToOne
    @JsonIgnoreProperties("lessons")
    private Trainer trainer;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "lesson_boxer",
               joinColumns = @JoinColumn(name = "lesson_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "boxer_id", referencedColumnName = "id"))
    private Set<Boxer> boxers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDetail() {
        return detail;
    }

    public Lesson detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public LocalDate getDate() {
        return date;
    }

    public Lesson date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Instant getHour() {
        return hour;
    }

    public Lesson hour(Instant hour) {
        this.hour = hour;
        return this;
    }

    public void setHour(Instant hour) {
        this.hour = hour;
    }

    public Trainer getTrainer() {
        return trainer;
    }

    public Lesson trainer(Trainer trainer) {
        this.trainer = trainer;
        return this;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

    public Set<Boxer> getBoxers() {
        return boxers;
    }

    public Lesson boxers(Set<Boxer> boxers) {
        this.boxers = boxers;
        return this;
    }

    public Lesson addBoxer(Boxer boxer) {
        this.boxers.add(boxer);
        return this;
    }

    public Lesson removeBoxer(Boxer boxer) {
        this.boxers.remove(boxer);
        return this;
    }

    public void setBoxers(Set<Boxer> boxers) {
        this.boxers = boxers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lesson)) {
            return false;
        }
        return id != null && id.equals(((Lesson) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Lesson{" +
            "id=" + getId() +
            ", detail='" + getDetail() + "'" +
            ", date='" + getDate() + "'" +
            ", hour='" + getHour() + "'" +
            "}";
    }
}
