package com.revature.services;

import com.revature.daos.ReviewDAO;
import com.revature.models.Review;
import com.revature.models.dtos.OutgoingReviewDTO;
import com.revature.models.dtos.ReviewDTO;
import com.revature.daos.UserDAO;
import com.revature.models.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import java.util.ArrayList;
import java.util.List;


@Service
public class ReviewService {
    private UserDAO userDAO;

    private ReviewDAO reviewDAO;

    @Autowired
    public ReviewService(ReviewDAO reviewDAO, UserDAO userDAO) {
        this.reviewDAO = reviewDAO;
        this.userDAO = userDAO;
    }
    /**
     * Edits an existing review identified by the specified ID with the provided review data.
     * If the review does not exist, an IllegalArgumentException is thrown.
     * Validates and updates the title and body of the review, ensuring they meet specified criteria.
     *
     * @param id The ID of the review to be edited.
     * @param review The review data containing the changes.
     * @return The edited review object.
     * @throws IllegalArgumentException If the review ID is not found or if the title/body does not meet validation criteria.
     */
    public Review editReview(int id, ReviewDTO review){

        Optional<Review> oR = reviewDAO.findById(id);

        if(oR.isEmpty()){
            throw new IllegalArgumentException("Item with " + id +" is not found!");
        }
        Review r = oR.get();

        if(isValidText(review.getTitle())){
            r.setTitle(review.getTitle());
        }else
            throw new IllegalArgumentException("Please ensure your title meets the following conditions:\n" +
                    "1. It cannot be empty.\n" +
                    "2. It must be a maximum of 500 characters long.\n" +
                    "3. It cannot contain vulgar terms.\n");


        if(isValidText(review.getBody())){
            r.setBody(review.getBody());
        }else
            throw new IllegalArgumentException("Please ensure your description meets the following conditions:\n" +
                    "1. It cannot be empty.\n" +
                    "2. It must be a maximum of 500 characters long.\n" +
                    "3. It cannot contain vulgar terms.\n");

        if(review.getRating()<0 || review.getRating() >5){
            throw new IllegalArgumentException("Please rate between 0 to 5!");
        }

        r.setRating(review.getRating());

        return reviewDAO.save(r);
    }

    /**
     * Checks if the given text is valid according to the following criteria:
     * 1. The text is not null or empty.
     * 2. The text does not exceed 500 characters.
     *
     * @param text The text to be validated.
     * @return true if the text is valid; false otherwise.
     */
    public boolean isValidText(String text){
        // Check if the description/title is empty or null
        if (text == null || text.isEmpty()) {
            return false;
        }

        // Check if the description/title exceeds 500 characters
        if (text.length() > 500) {
            return false;
        }

        return true;
    }


    //This method gets all reviews that belong to a userId,
    //then converts them to a list of ReviewDTO's

    // AS I NEEDED USER TO BE ABLE TO DELETE REVIEWS AND NEEDED THE ID I CREATED A NEW VERSION
//    public List<ReviewDTO> getAllRevByUserId(int userId) {
//        Optional<User> found = userDAO.findById(userId);
//        if(found.isEmpty()){
//            throw new IllegalArgumentException("That user does not exist.");
//        }
//        List<Review> allRevs;
//        try {
//            allRevs = reviewDAO.findAllByUserId(userId);
//        }
//        catch(Exception e){
//            throw new IllegalArgumentException("Something went wrong when trying to receive a user's Reviews.");
//        }
//        List<ReviewDTO> allRevDTO = new ArrayList<ReviewDTO>();
//        for (Review rev : allRevs) {
//            ReviewDTO revDTO = new ReviewDTO(rev.getTitle(),rev.getBody(),rev.getItem().getId(),rev.getRating());
//            allRevDTO.add(revDTO);
//        }
//        return allRevDTO;
//    }

    // this version return review ids too
    public List<OutgoingReviewDTO> getAllRevByUserId(int userId) {
        Optional<User> found = userDAO.findById(userId);
        if(found.isEmpty()){
            throw new IllegalArgumentException("That user does not exist.");
        }
        List<Review> allRevs;
        try {
            allRevs = reviewDAO.findAllByUserId(userId);
        }
        catch(Exception e){
            throw new IllegalArgumentException("Something went wrong when trying to receive a user's Reviews.");
        }
        List<OutgoingReviewDTO> allRevDTO = new ArrayList<OutgoingReviewDTO>();
        for (Review rev : allRevs) {
            OutgoingReviewDTO outgoingReviewDTO = new OutgoingReviewDTO(rev.getId(), rev.getTitle(),rev.getBody(),rev.getItem().getId(),rev.getRating());

            allRevDTO.add(outgoingReviewDTO);
        }
        return allRevDTO;
    }


    //This method gets all reviews
    //then converts them to a list of ReviewDTO's
    public List<ReviewDTO> getAllReviews() {
        List<Review> allRevs;
        try {
            allRevs = reviewDAO.findAll();
        }
        catch(Exception e){
            throw new IllegalArgumentException("Something went wrong when trying to receive a user's Reviews.");
        }
        List<ReviewDTO> allRevDTO = new ArrayList<ReviewDTO>();
        for (Review rev : allRevs) {
            ReviewDTO revDTO = new ReviewDTO(rev.getTitle(),rev.getBody(),rev.getItem().getId(),rev.getRating());
            allRevDTO.add(revDTO);
        }
        return allRevDTO;
    }

    /**
     * Deletes a review with the specified ID.
     * If the review does not exist, an IllegalArgumentException is thrown.
     *
     * @param id The ID of the review to be deleted.
     * @throws IllegalArgumentException If the review ID is not found.
     */
    public void deleteReview(int id){
        Optional<Review> oR = reviewDAO.findById(id);

        if(oR.isEmpty()){
            throw new IllegalArgumentException("Item with " + id +" is not found!");
        }
        reviewDAO.delete(oR.get());
    }

    /**
     * Checks if the user is the author of the review.
     *
     * @param userId The ID of the user.
     * @param reviewId The ID of the review.
     * @return true if the user is the author of the review; false otherwise.
     */
    public boolean isAuthor(int userId, int reviewId) {

        Optional<Review> review = reviewDAO.findById(reviewId);

        // Check if the review exists and if the user is the author of the review
        return review.isPresent() && review.get().getUser().getId() == userId;
    }

}


