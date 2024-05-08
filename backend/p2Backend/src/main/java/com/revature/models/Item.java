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

    @Column (nullable = false)
    private double rating;


}
