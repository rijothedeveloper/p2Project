package com.revature.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="collections")
public class Collection {

    @EmbeddedId
    private CollectionKey id;

    public Collection() {
    }

    public Collection(CollectionKey id) {
        this.id = id;
    }

    public CollectionKey getId() {
        return id;
    }

    public void setId(CollectionKey id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Collection{" +
                "id=" + id +
                '}';
    }
}
