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

    @Column(nullable = true)
    private double rating;

    @OneToMany(mappedBy = "score", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Score> score;

    @Column(nullable = false)
    @CurrentTimestamp
    private String timestamp;

    public Review() {
    }

    public Review(int id, String title, String body, User user, Item item, double rating, List<Score> score, String timestamp) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.user = user;
        this.item = item;
        this.rating = rating;
        this.score = score;
        this.timestamp = timestamp;
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
        return score;
    }

    public void setScore(List<Score> score) {
        this.score = score;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
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
                ", score=" + score +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
