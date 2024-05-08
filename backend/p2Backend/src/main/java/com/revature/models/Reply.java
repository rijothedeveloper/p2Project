package com.revature.models;


import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="replies")
public class Reply {

    @Id
    @GeneratedValue
    private int id;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "userId")
    private User user;
    private int reviewId;

    private String body;

    @CurrentTimestamp
    @Column(nullable = false)
    private String timestamp;


    public Reply() {
    }

    public Reply(int id, User user, int reviewId, String body, String timestamp) {
        this.id = id;
        this.user = user;
        this.reviewId = reviewId;
        this.body = body;
        this.timestamp = timestamp;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return "Reply{" +
                "id=" + id +
                ", user=" + user +
                ", reviewId=" + reviewId +
                ", body='" + body + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
