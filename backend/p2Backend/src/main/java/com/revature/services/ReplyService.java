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
import java.util.Optional;
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

    public List<Reply> repliesByReview(int reviewId) {
        Review review = reviewDAO.findById(reviewId).orElseThrow(() -> new IllegalArgumentException("No review found for review ID: " + reviewId));
        return replyDAO.findByReview_Id(reviewId);
    }
    /**
     * Deletes a reply identified by the specified ID.
     * If the reply does not exist, an IllegalArgumentException is thrown.
     *
     * @param id The ID of the reply to be deleted.
     * @throws IllegalArgumentException If the reply ID is not found.
     */
    public void deleteReply(int id) {

        Optional<Reply> oR = replyDAO.findById(id);
        if (oR.isEmpty()) {
            throw new IllegalArgumentException("Reply with ID " + id + " not found!");
        }
        replyDAO.delete(oR.get());
    }

    /**
     * Checks if the user is the author of the reply.
     *
     * @param userId The ID of the user to check.
     * @param replyId The ID of the reply to check.
     * @return True if the user is the author of the reply, false otherwise.
     */
    public boolean isAuthor(int userId, int replyId) {
        Optional<Reply> reply = replyDAO.findById(replyId);

        // If the reply is not found or the user is not the author, return false
        return reply.isPresent() && reply.get().getUser().getId() == userId;
    }

    /**
     * Retrieves all replies for a review identified by the specified ID.
     *
     * @param reviewId The ID of the review to retrieve replies for.
     * @return A list of ReplyDTO objects containing the replies for the review.
     */
    public List<ReplyDTO> getAllRepliesForReview(int reviewId) {
        Review review = reviewDAO.findById(reviewId).orElseThrow(
                () -> new IllegalArgumentException("No review found for ID: " + reviewId));
        List<Reply> replies = replyDAO.findByReview(review);
        return replies.stream()
                .map(reply -> new ReplyDTO(
                        reply.getReview().getId(), reply.getBody(),
                        reply.getUser().getUsername())).collect(Collectors.toList());
    }


}
