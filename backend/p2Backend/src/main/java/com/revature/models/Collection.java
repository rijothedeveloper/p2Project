package com.revature.models;

public class Collection {

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
