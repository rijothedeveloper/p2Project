package com.revature.models;


import jakarta.persistence.*;

import java.io.Serializable;

@Embeddable
public class FollowKey implements Serializable {

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "following_id")
    private int followingUserId;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "followed_id")
    private int followedUserId;

    // getters, setters, equals, and hashCode methods


    public FollowKey() {
    }

    public FollowKey(int followingUserId, int followedUserId) {
        this.followingUserId = followingUserId;
        this.followedUserId = followedUserId;
    }

    public int getFollowingUserId() {
        return followingUserId;
    }

    public void setFollowingUserId(int followingUserId) {
        this.followingUserId = followingUserId;
    }

    public int getFollowedUserId() {
        return followedUserId;
    }

    public void setFollowedUserId(int followedUserId) {
        this.followedUserId = followedUserId;
    }

    @Override
    public String toString() {
        return "FollowKey{" +
                "followingUserId=" + followingUserId +
                ", followedUserId=" + followedUserId +
                '}';
    }
}