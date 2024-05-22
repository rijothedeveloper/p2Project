package com.revature.models.dtos;

public class OutgoingReviewDTO {

    private int id;
    private String title;
    private String body;
    private int itemId;
    private double rating;
    private String username;

    public OutgoingReviewDTO() {
    }

    public OutgoingReviewDTO(int id, String title, String body, int itemId, double rating, String username) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.itemId = itemId;
        this.rating = rating;
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "OutgoingReviewDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", body='" + body + '\'' +
                ", itemId=" + itemId +
                ", rating=" + rating +
                '}';
    }
}
