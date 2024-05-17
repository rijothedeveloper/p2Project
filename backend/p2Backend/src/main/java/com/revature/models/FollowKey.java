package com.revature.models;


import jakarta.persistence.*;

import java.io.Serializable;

@Embeddable
public class FollowKey implements Serializable {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "following_id")
    private User followingUser;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "followed_id")
    private User followedUser;

    // getters, setters, equals, and hashCode methods


    public FollowKey() {
    }

    public FollowKey(User followingUser, User followedUser) {
        this.followingUser = followingUser;
        this.followedUser = followedUser;
    }

    public User getFollowingUser() {
        return followingUser;
    }

    public void setFollowingUser(User followingUser) {
        this.followingUser = followingUser;
    }

    public User getFollowedUser() {
        return followedUser;
    }

    public void setFollowedUser(User followedUser) {
        this.followedUser = followedUser;
    }

    @Override
    public String toString() {
        return "FollowKey{" +
                "followingUser=" + followingUser +
                ", followedUser=" + followedUser +
                '}';
    }
}