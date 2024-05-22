package com.revature.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@Entity
@Table(name="items")
public class Item {

    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false)
    private String name;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
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

    // added to prevent looping while reviewing item
    @JsonIgnore
    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Review> reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "id.item", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Collection> collections;

    public Item() {
    }


    public Item(String name, Producer producer, String description, String category, String image,  Set<Review> reviews, Set<Collection> collections) {
        this.name = name;
        this.producer = producer;
        this.rating = 0;
        this.description = description;
        this.category = category;
        this.image = image;
        this.reviews = reviews;
        this.collections = collections;
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

    public Set<Review> getReviews() { return reviews; }

    public void setReviews(Set<Review> reviews) { this.reviews = reviews; }

    public Set<Collection> getCollections() { return collections; }

    public void setCollections(Set<Collection> collections) { this.collections = collections; }

    @Override
    public String toString() {
        return "Item{" +
                "itemId=" + id +
                ", name='" + name + '\'' +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", image='" + image + '\'' +
                '}';
    }

    public double getReviewCount() {
        return reviews.size();
    }
}