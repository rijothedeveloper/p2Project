package com.revature.models;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;
@Component
@Entity
@Table(name="scores")
public class Score {


    @EmbeddedId
    private ScoreKey id;

    public Score() {
    }

    public Score(ScoreKey id) {
        this.id = id;
    }

    public ScoreKey getId() {
        return id;
    }

    public void setId(ScoreKey id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Score{" +
                "id=" + id +
                '}';
    }
}