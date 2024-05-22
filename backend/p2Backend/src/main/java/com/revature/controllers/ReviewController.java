package com.revature.controllers;

import com.revature.models.Review;
import com.revature.models.dtos.ReviewDTO;
import com.revature.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.revature.utils.JwtTokenUtil;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReviewController {

    private ReviewService reviewService;
    private JwtTokenUtil jwtUtil;


    @Autowired
    public ReviewController(ReviewService reviewService, JwtTokenUtil jwtUtil) {
        this.reviewService = reviewService;
        this.jwtUtil = jwtUtil;
    }

    //This method will return a List of outbound review DTOs that all belong to a userId
    //@GetMapping("/{userId}")
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getAllRevByUserId(@PathVariable int userId) {
        //TODO: Login security checks

        try {
            return ResponseEntity.ok(reviewService.getAllRevByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<?> getReviewsByItemId(@RequestHeader("Authorization") String token, @PathVariable int itemId) {
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            throw new RuntimeException("You must be logged in to reply to a review");
        }
        try {
            return ResponseEntity.ok(reviewService.reviewsByItemId(itemId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //This method will return a List of all outbound review DTOs
    @GetMapping()
    public ResponseEntity<?> getAllReviews() {
        try {
            return ResponseEntity.ok(reviewService.getAllReviews());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Handles the HTTP PUT request to edit a review.
     *
     * @param id      The ID of the review to be edited.
     * @param review  The updated review data in the form of a ReviewDTO object.
     * @param session The HttpSession object to check user authentication (optional).
     * @return ResponseEntity containing the edited review data or an error message.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> editReview(@PathVariable int id, @RequestBody ReviewDTO review){
        try{
            Review r = reviewService.editReview(id, review);
            // Convert the updated review to a ReviewDTO object
            ReviewDTO rDTO = new ReviewDTO(r.getTitle(), r.getBody(), r.getId(),  r.getRating());
            // Return a ResponseEntity containing the updated review data
            return ResponseEntity.ok().body(rDTO);
        }catch (IllegalArgumentException e){
            // Handle the case where editing the review fails due to invalid input or other errors
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    /**
     * Handles the HTTP DELETE request to delete a review.
     *
     * @param id The ID of the review to be deleted.
     * @return ResponseEntity containing a success message or an error message.
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteReview(@PathVariable int id, @RequestHeader("Authorization") String token){
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        String role = jwtUtil.extractRole(jwt).toLowerCase();

        // Check if the user is logged in
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to delete a review.");
        }
        System.out.println("Role: " + role);
        // Check if the user is the author of the review or an admin
        if (!reviewService.isAuthor(userId, id) && !role.equals("admin")){
            return ResponseEntity.status(401).body("You must be the author of the review or an admin to delete a review.");
        }

        // Attempt to delete the review
        try{
            reviewService.deleteReview(id);
            return ResponseEntity.ok().body("Review deleted successfully");
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<Object> addReview(@RequestBody ReviewDTO review, @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to add a review.");
        }
        try {
            return ResponseEntity.status(201).body(reviewService.addReview(review, userId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

}
