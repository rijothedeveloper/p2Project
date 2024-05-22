package com.revature.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;
//    private int id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;


    @Column(nullable = false)
    private String timestamp;

    @JsonIgnore
    @OneToMany(mappedBy = "id.followingUser", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Follow> follow;

    @JsonIgnore
    @OneToMany(mappedBy = "id.user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<com.revature.models.Collection> collection;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Review> reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "id.user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Score> scores;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Reply> replies;

    public User() {
    }

    public User(int id, String username, String password, String firstName, String role, String lastName, String email, String timestamp, Set<Follow> follow, Set<Collection> collection) {
        Id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.role = role;
        this.lastName = lastName;
        this.email = email;
        this.timestamp = timestamp;
        this.follow = follow;
        this.collection = collection;
    }

    public User(int id, String username, String password, String firstName, String role, String lastName, String email, String timestamp, Set<Follow> follow, Set<Collection> collection, Set<Review> reviews, Set<Score> scores, Set<Reply> replies) {
        Id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.role = role;
        this.lastName = lastName;
        this.email = email;
        this.timestamp = timestamp;
        this.follow = follow;
        this.collection = collection;
        this.reviews = reviews;
        this.scores = scores;
        this.replies = replies;
    }

    public User(int id, String username, String password, String email, String firstName, String lastName, String role, String timestamp) {
        Id = id;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.role = role;
        this.lastName = lastName;
        this.email = email;
        this.timestamp = timestamp;
    }

    public int getId() {
        return Id;
    }

    public void setId(int id) {
        Id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Set<Follow> getFollow() {
        return follow;
    }

    public void setFollow(Set<Follow> follow) {
        this.follow = follow;
    }

    public Set<Collection> getCollection() {
        return collection;
    }

    public void setCollection(Set<Collection> collection) {
        this.collection = collection;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public Set<Score> getScores() {
        return scores;
    }

    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }

    public Set<Reply> getReplies() {
        return replies;
    }

    public void setReplies(Set<Reply> replies) {
        this.replies = replies;
    }

    @Override
    public String toString() {
        return "User{" +
                "Id=" + Id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", role='" + role + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", timestamp='" + timestamp + '\'' +
                ", follow=" + follow +
                ", collection=" + collection +
                ", reviews=" + reviews +
                ", scores=" + scores +
                ", replies=" + replies +
                '}';
    }

    // Auth overrides

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public java.util.Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }
}