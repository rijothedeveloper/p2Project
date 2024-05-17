package com.revature.models.dtos;

public class OutgoingUserDTO {

    private int id;
    private String firstName;
    private String lastName;
    private String username;
    private String role;
    private String email;
    private String timestamp;
    private String jwt;

    public OutgoingUserDTO() {
    }

    public OutgoingUserDTO(int id, String firstName, String lastName, String username, String role, String email, String timestamp) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.role = role;
        this.email = email;
        this.timestamp = timestamp;
    }

    public OutgoingUserDTO(int id, String firstName, String lastName, String username, String role, String email, String timestamp, String jwt) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.role = role;
        this.email = email;
        this.timestamp = timestamp;
        this.jwt = jwt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
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

    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "userId=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                ", email='" + email + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
