package com.revature.services;


import com.revature.daos.ReplyDAO;
import com.revature.daos.ReviewDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reply;
import com.revature.models.dtos.ReplyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Reply addReply(int reviewId, int userId, ReplyDTO reply) {
        Reply newReply = new Reply();
        newReply.setBody(reply.getBody());
        newReply.setUser(userDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + userId)));
        newReply.setReview(reviewDAO.findById(reviewId).orElseThrow(() -> new IllegalArgumentException("No review found for ID: " + reviewId)));
        return replyDAO.save(newReply);
    }
}
