package com.revature.services;

import com.revature.daos.ReviewDAO;
import com.revature.models.Review;
import com.revature.models.dtos.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {

    private ReviewDAO reviewDAO;

    @Autowired
    public ReviewService(ReviewDAO reviewDAO) {
        this.reviewDAO = reviewDAO;
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



}
