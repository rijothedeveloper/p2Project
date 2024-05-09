package com.revature.services;

import com.revature.daos.ReviewDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Review;
import com.revature.models.User;
import com.revature.models.dtos.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.MissingResourceException;
import java.util.Optional;

@Service
public class ReviewService {
    private UserDAO userDAO;

    private ReviewDAO reviewDAO;

    @Autowired
    public ReviewService(ReviewDAO reviewDAO, UserDAO userDAO) {
        this.reviewDAO = reviewDAO;
        this.userDAO = userDAO;
    }

    //This method gets all reviews that belong to a userId,
    //then converts them to a list of ReviewDTO's
    public List<ReviewDTO> getAllRevByUserId(int userId) {
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
        List<ReviewDTO> allRevDTO = new ArrayList<ReviewDTO>();
        for (Review rev : allRevs) {
            ReviewDTO revDTO = new ReviewDTO(rev.getTitle(),rev.getBody(),rev.getItem().getId(),rev.getRating());
            allRevDTO.add(revDTO);
        }
        return allRevDTO;
    }
}


