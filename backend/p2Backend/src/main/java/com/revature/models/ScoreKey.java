package com.revature.models;


import jakarta.persistence.*;
import java.io.Serializable;

@Embeddable
public class ScoreKey implements Serializable {


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review review;

    public ScoreKey() {
    }

    public ScoreKey(User user, Review review) {
        this.user = user;
        this.review = review;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Review getReview() {
        return review;
    }

    public void setReview(Review review) {
        this.review = review;
    }

    @Override
    public String toString() {
        return "ScoreKey{" +
                "user=" + user +
                ", review=" + review +
                '}';
    }
}
