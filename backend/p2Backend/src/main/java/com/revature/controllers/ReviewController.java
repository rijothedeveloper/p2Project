package com.revature.controllers;

import com.revature.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReviewController {

    private ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    //This method will return a List of outbound review DTOs that all belong to a userId
    @GetMapping("/{userId}")
    public ResponseEntity<?> getAllRevByUserId(@PathVariable int userId) {
        //TODO: Login security checks

        try {
            return ResponseEntity.ok(reviewService.getAllRevByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
