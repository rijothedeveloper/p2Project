package com.revature.models.dtos;

public class ReplyDTO {

    private int reviewId;
    private String body;

    public ReplyDTO() {
    }

    public ReplyDTO(int reviewId, String body) {
        this.reviewId = reviewId;
        this.body = body;
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

    @Override
    public String toString() {
        return "ReplyDTO{" +
                "reviewId=" + reviewId +
                ", body='" + body + '\'' +
                '}';
    }
}
