package com.revature.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue
    private int userId;

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



    public User() {
    }

    public User(int userId, String username, String firstName, String role, String lastName, String email, String timestamp, String password) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.role = role;
        this.lastName = lastName;
        this.email = email;
        this.timestamp = timestamp;
        this.password = password;
    }

    public int getUserId() {
        return userId;
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
                "userId=" + userId +
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