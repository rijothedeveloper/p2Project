package com.revature.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Entity
@Table(name="reviews")
public class Review {

    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String body;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "itemId")
    private Item item;

    @Column
    private double rating;

    @OneToMany(mappedBy = "vote", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Score> scores;

    @Column(nullable = false)
    @CurrentTimestamp
    private String timestamp;

    @OneToMany(mappedBy = "review", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Reply> replies;
    public Review() {
    }

    public Review(int id, String title, String body, User user, Item item, double rating, List<Score> scores, String timestamp, List<Reply> replies) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.user = user;
        this.item = item;
        this.rating = rating;
        this.scores = scores;
        this.timestamp = timestamp;
        this.replies = replies;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public List<Score> getScore() {
        return scores;
    }

    public void setScore(List<Score> scores) {
        this.scores = scores;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public List<Score> getScores() {
        return scores;
    }

    public void setScores(List<Score> scores) {
        this.scores = scores;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
        this.replies = replies;
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", user=" + user +
                ", item=" + item +
                ", rating=" + rating +
                ", scores=" + scores +
                ", timestamp='" + timestamp + '\'' +
                ", replies=" + replies +
                '}';
    }
}