package com.revature.models;


import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Entity
@Table(name="items")
public class Item {

    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "producer_id")
    private Producer producer;

    @Column
    private double rating;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String category;

    @Column
    private String image;

    @OneToMany(mappedBy = "item", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Review> reviews;

    public Item() {
    }


    public Item(String name, Producer producer, String description, String category, String image,  List<Review> reviews) {
        this.name = name;
        this.producer = producer;
        this.rating = 0;
        this.description = description;
        this.category = category;
        this.image = image;
        this.reviews = reviews;
    }

    public Item(String name, Producer producer, String description, String category, String image) {
        this.name = name;
        this.producer = producer;
        this.rating = 0;
        this.description = description;
        this.category = category;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Producer getProducer() {
        return producer;
    }

    public double getRating() {
        return rating;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getImage() {
        return image;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setProducer(Producer producer) {
        this.producer = producer;
    }

    public List<Review> getReviews() { return reviews; }

    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    @Override
    public String toString() {
        return "Item{" +
                "itemId=" + id +
                ", name='" + name + '\'' +
                ", producer_id=" + producer +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", image='" + image + '\'' +
                ", reviews='" + reviews + '\'' +
                '}';
    }
}