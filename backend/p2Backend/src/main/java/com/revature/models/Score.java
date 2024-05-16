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

    private int vote;
    public Score() {
    }

    public Score(ScoreKey id, int vote) {
        this.id = id;
        this.vote = vote;
    }

    public Score(int vote) {
        this.vote=vote;
    }

    public ScoreKey getId() {
        return id;
    }

    public void setId(ScoreKey id) {
        this.id = id;
    }

    public int getVote() {
        return vote;
    }

    public void setVote(int vote) {
        this.vote = vote;
    }

    @Override
    public String toString() {
        return "Score{" +
                "id=" + id +
                ", vote=" + vote +
                '}';
    }
}
