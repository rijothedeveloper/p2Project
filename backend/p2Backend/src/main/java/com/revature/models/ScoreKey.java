package com.revature.models;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
@Embeddable
public class ScoreKey implements Serializable {

    private int userId;
    private int reviewId;
    public ScoreKey() {
    }
    public ScoreKey(int userId, int reviewId) {
        this.userId = userId;
        this.reviewId = reviewId;
    }
    public int getUserId() {
        return userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
    public int getReviewId() {
        return reviewId;
    }
    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }
    @Override
    public String toString() {
        return "ScoreKey{" +
                "userId=" + userId +
                ", reviewId=" + reviewId +
                '}';
    }
}


 