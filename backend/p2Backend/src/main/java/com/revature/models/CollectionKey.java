package com.revature.models;
import jakarta.persistence.*;

import java.io.Serializable;

@Embeddable
public class CollectionKey implements Serializable{


    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    public CollectionKey() {
    }

    public CollectionKey(Item item, User user) {
        this.item = item;
        this.user = user;
    }


    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "CollectionKey{" +
                "item=" + item +
                ", user=" + user +
                '}';
    }
}
