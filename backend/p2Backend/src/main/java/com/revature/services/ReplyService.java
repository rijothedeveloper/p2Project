package com.revature.services;


import com.revature.daos.ReplyDAO;
import com.revature.daos.ReviewDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reply;
import com.revature.models.Review;
import com.revature.models.dtos.ReplyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReplyService {

    ReplyDAO replyDAO;
    UserDAO userDAO;
    ReviewDAO reviewDAO;

    @Autowired
    public ReplyService(ReplyDAO replyDAO, UserDAO userDAO, ReviewDAO reviewDAO) {
        this.replyDAO = replyDAO;
        this.userDAO = userDAO;
        this.reviewDAO = reviewDAO;
    }

    public Reply addReply(int userId, ReplyDTO reply) {
        Reply newReply = new Reply();
        newReply.setBody(reply.getBody());
        newReply.setUser(userDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + userId)));
        newReply.setReview(reviewDAO.findById(reply.getReviewId()).orElseThrow(() -> new IllegalArgumentException("No review found for ID: " + reply.getReviewId())));
        return replyDAO.save(newReply);
    }

    public List<ReplyDTO> getAllRepliesForReview(int reviewId) {
        Review review = reviewDAO.findById(reviewId).orElseThrow(() -> new IllegalArgumentException("No review found for ID: " + reviewId));
        List<Reply> replies = replyDAO.findByReview(review);
        return replies.stream()
                .map(reply -> new ReplyDTO(reply.getReview().getId(), reply.getBody(), reply.getUser().getUsername()))
                .collect(Collectors.toList());
    }
}
