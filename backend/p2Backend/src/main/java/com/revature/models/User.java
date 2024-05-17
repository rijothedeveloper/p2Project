package com.revature.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.List;

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

    @CurrentTimestamp
    @Column(nullable = false)
    private String timestamp;

    @OneToMany(mappedBy = "id.followingUser", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Follow> follow;

    @OneToMany(mappedBy = "id.user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<com.revature.models.Collection> collection;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "id.user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Score> scores;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Reply> replies;

    public User() {
    }

    public User(int id, String username, String password, String firstName, String role, String lastName, String email, String timestamp, List<Follow> follow, List<Collection> collection) {
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

    public User(int id, String username, String password, String firstName, String role, String lastName, String email, String timestamp, List<Follow> follow, List<Collection> collection, List<Review> reviews, List<Score> scores, List<Reply> replies) {
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

    public List<Follow> getFollow() {
        return follow;
    }

    public void setFollow(List<Follow> follow) {
        this.follow = follow;
    }

    public List<Collection> getCollection() {
        return collection;
    }

    public void setCollection(List<Collection> collection) {
        this.collection = collection;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Score> getScores() {
        return scores;
    }

    public void setScores(List<Score> scores) {
        this.scores = scores;
    }

    public List<Reply> getReplies() {
        return replies;
    }

    public void setReplies(List<Reply> replies) {
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