package com.revature.services;

import com.revature.daos.*;
import com.revature.models.Item;
import com.revature.models.Review;
import com.revature.models.Score;
import com.revature.models.User;
import com.revature.models.dtos.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
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

    public ReviewDTO saveReview(ReviewDTO review, String username, int itemId) {
        Optional<User> user = userDAO.findByUsername(username);
        Optional<Item> item = itemDAO.findById(itemId);
        if(item.isEmpty()){
            throw new RuntimeException("No item by this id.");
        }
        Optional<Review> itemReviewForUser = reviewDAO.findByUserUsernameAndItemId(user.get().getUsername(), itemId);
        if(itemReviewForUser.isPresent()){
            throw new RuntimeException("User has already rated this item.");
        }
        if(user.isPresent() && item.isPresent()) {
            Review newReview = new Review();
            newReview.setTitle(review.getTitle());
            newReview.setBody(review.getBody());
            newReview.setUser(user.get());
            newReview.setItem(item.get());
            newReview.setRating(review.getRating());
            reviewDAO.save(newReview);
            ReviewDTO newReviewDTO = new ReviewDTO(newReview.getTitle(), newReview.getBody(), newReview.getItem().getId(), newReview.getRating());
            return newReviewDTO;
        }else {
            throw new RuntimeException("User or item not found");
        }

    }


}
