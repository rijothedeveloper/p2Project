package com.revature.controllers;

import com.revature.models.dtos.ReviewDTO;
import com.revature.services.ReviewService;
import com.revature.utils.JwtTokenUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReviewController {

    private ReviewService reviewService;
    private JwtTokenUtil tokenUtil;

    @Autowired
    public ReviewController(ReviewService reviewService, JwtTokenUtil tokenUtil) {
        this.reviewService = reviewService;
        this.tokenUtil = tokenUtil;
    }
    @PostMapping("/{itemId}")
    public ResponseEntity<?> reviewItem(@RequestBody ReviewDTO review, @PathVariable int itemId, @RequestHeader("Authorization") String token){
        String jwt = token.substring(7); //remove "Bearer " from the token
        System.out.println(jwt);
        int userId = tokenUtil.extractUserId(jwt); //send the jwt to the util to extract userId

        if (review.getTitle() == null || review.getTitle().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Title must not be empty.");
        }
        if (review.getBody() == null || review.getBody().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Body must not be empty.");
        }
        try{
            return ResponseEntity.ok(reviewService.saveReview(review, itemId, userId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
