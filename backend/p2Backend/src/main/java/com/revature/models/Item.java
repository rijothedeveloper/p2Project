package com.revature.models;


import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="items")
public class Item {

    @Id
    @GeneratedValue
    private int itemId;

    @Column
    private String name;

    @Column
    private double producer_id;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String category;

    @Column
    private String image;

    public Item() {
    }

    public Item(int itemId, String name, double producer_id, double rating, String description, String category, String image) {
        this.itemId = itemId;
        this.name = name;
        this.producer_id = producer_id;
        this.rating = rating;
        this.description = description;
        this.category = category;
        this.image = image;
    }

    public int getItemId() {
        return itemId;
    }

    public String getName() {
        return name;
    }

    public double getProducer_id() {
        return producer_id;
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
    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setProducer_id(double producer_id) {
        this.producer_id = producer_id;
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
    @Override
    public String toString() {
        return "Item{" +
                "itemId=" + itemId +
                ", name='" + name + '\'' +
                ", producer_id=" + producer_id +
                ", rating=" + rating +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}