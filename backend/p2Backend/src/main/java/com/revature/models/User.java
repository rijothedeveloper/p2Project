package com.revature.models;

import jakarta.persistence.*;
import org.hibernate.annotations.CurrentTimestamp;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    private int Id;

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

    @OneToMany(mappedBy = "id.followingUserId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Follow> follow;


    public User() {
    }

    public User(int Id, String username, String firstName, String role, String lastName, String email, String timestamp, String password) {
        this.Id = Id;
        this.username = username;
        this.firstName = firstName;
        this.role = role;
        this.lastName = lastName;
        this.email = email;
        this.timestamp = timestamp;
        this.password = password;
    }

    public int getUserId() {
        return Id;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getRole() {
        return role;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + Id +
                ", username='" + username + '\'' +
                ", password=" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", role='" + role + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}