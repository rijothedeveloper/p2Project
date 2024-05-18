package com.revature.services;

import com.revature.daos.*;
import com.revature.models.Item;
import com.revature.models.Review;
import com.revature.models.Score;
import com.revature.models.User;
import com.revature.models.dtos.ReviewDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private ReviewDAO reviewDAO;
    private UserDAO userDAO;
    private ItemDAO itemDAO;
    private ReplyDAO replyDAO;
    private ScoreDAO scoreDAO;

    @Autowired
    public ReviewService(ReviewDAO reviewDAO, UserDAO userDAO, ItemDAO itemDAO, ReplyDAO replyDAO, ScoreDAO scoreDAO) {
        this.reviewDAO = reviewDAO;
        this.userDAO = userDAO;
        this.itemDAO = itemDAO;
        this.replyDAO = replyDAO;
        this.scoreDAO = scoreDAO;
    }

    public ReviewDTO saveReview(ReviewDTO review, int itemId, int userId) {
        Review newReview = new Review();
        //Attempts to set user
        try {
            User user = userDAO.getById(userId);
            newReview.setUser(user);
        }catch (EntityNotFoundException e){
            System.err.println("User not found: " + e.getMessage());
        }catch (DataAccessException e){
            System.err.println("Database access error: " + e.getMessage());
        }
        //attempts to set item
        try {
            Optional<Item> item = itemDAO.findById(itemId);
            if (item.isPresent()) {
                newReview.setItem(item.get());
            } else {
                throw new EntityNotFoundException("Item not found with ID: " + itemId);
            }
        }catch (EntityNotFoundException e){
            System.err.println("Item not found: " + e.getMessage());
        } catch (DataAccessException e) {
            System.err.println("Database access error: " + e.getMessage());
            return null;
        }
        //Checks fields are valid
        if(itemId <= 0){
            throw new RuntimeException("User Id must be present");
        }
        if (review.getTitle() == null || review.getTitle().trim().isEmpty()) {
            throw new RuntimeException("Title must not be empty.");
        }
        if (review.getBody() == null || review.getBody().trim().isEmpty()) {
            throw new RuntimeException("Body must not be empty.");
        }
        if (review.getRating() < 1 || review.getRating() > 5) { // Assuming rating is between 1 and 5
            throw new RuntimeException("Review rating must be between 1 and 5");
        }
        newReview.setTitle(review.getTitle());
        newReview.setBody(review.getBody());
        newReview.setRating(review.getRating());
        //Attempts to save review
        try {
            reviewDAO.save(newReview);
            return new ReviewDTO(newReview.getTitle(), newReview.getBody(), newReview.getItem().getId(), newReview.getRating());
        }catch (DataAccessException e){
            System.err.println("Failed to save review: " + e.getMessage());
            return null;
        }

    }
}
