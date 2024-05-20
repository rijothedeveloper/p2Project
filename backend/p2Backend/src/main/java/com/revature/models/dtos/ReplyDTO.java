package com.revature.models.dtos;

public class ReplyDTO {

    private int reviewId;
    private String body;
    private String username;

    public ReplyDTO() {
    }

    public ReplyDTO(int reviewId, String body, String username) {
        this.reviewId = reviewId;
        this.body = body;
        this.username = username;
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public String toString() {
        return "ReplyDTO{" +
                "reviewId=" + reviewId +
                ", body='" + body + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
