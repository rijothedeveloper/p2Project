package com.revature.controllers;

import ch.qos.logback.classic.Logger;
import com.revature.models.Review;
import com.revature.services.ScoreService;
import com.revature.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/scores")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ScoreController {

    private ScoreService scoreService;
    private JwtTokenUtil jwtUtil;


    @Autowired
    public ScoreController(ScoreService scoreService, JwtTokenUtil jwtUtil) {
        this.scoreService = scoreService;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/{reviewId}")
    public ResponseEntity<Object> newVote(@PathVariable int reviewId, @RequestBody int vote, @RequestHeader("Authorization") String token)  {

        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to vote on a review");
        }

        try {
            Review review = scoreService.newVote(reviewId, userId, vote);
            return ResponseEntity.status(201).body(review);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }
    //@PutMapping("/{reviewId}")
    @PutMapping("/{reviewId}")
    public ResponseEntity<Object> updateVote(@PathVariable int reviewId, @RequestBody int vote, @RequestHeader("Authorization") String token ){
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to vote on a review");
        }

        try {
            Review review = scoreService.updateVote(reviewId, userId, vote);
            return ResponseEntity.status(202).body(review);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }
    //@DeleteMapping("/{reviewId}")
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Object> deleteVote(@PathVariable int reviewId, @RequestHeader("Authorization") String token){
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to vote on a review");
        }

        try {
            Review review = scoreService.deleteVote(reviewId, userId);
            return ResponseEntity.status(204).body(review);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(e.getMessage());
        }
    }
    //@GetMapping("/{reviewId}")
    @GetMapping("/{reviewId}")
    public ResponseEntity<Object> getUserVote(@PathVariable int reviewId, @RequestHeader("Authorization") String token){
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to vote on a review");
        }

        try {
            int vote = scoreService.getUserVote(reviewId, userId);
            return ResponseEntity.status(200).body(vote);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
