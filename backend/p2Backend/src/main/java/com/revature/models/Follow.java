package com.revature.models;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="follows")
public class Follow {

    @EmbeddedId
    private FollowKey id;

    public Follow() {
    }

    public Follow(FollowKey id) {
        this.id = id;
    }

    public FollowKey getId() {
        return id;
    }

    public void setId(FollowKey id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Follow{" +
                "id=" + id +
                '}';
    }
}
