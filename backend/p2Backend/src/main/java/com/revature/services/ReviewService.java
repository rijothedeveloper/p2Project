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

    public ReviewDTO saveReview(ReviewDTO review, int itemId, int userId) {
        User user = userDAO.getById(userId);
        Item item = itemDAO.findById(itemId).get();
        Review newReview = new Review();
        newReview.setItem(item);
        newReview.setUser(user);
        newReview.setTitle(review.getTitle());
        newReview.setBody(review.getBody());
        newReview.setRating(review.getRating());

        reviewDAO.save(newReview);

        return new ReviewDTO(newReview.getTitle(), newReview.getBody(), newReview.getItem().getId(), newReview.getRating());
    }
}
