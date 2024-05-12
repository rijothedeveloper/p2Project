package com.revature.controllers;

import com.revature.models.dtos.ReviewDTO;
import com.revature.services.ReviewService;
import com.revature.services.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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
    private TokenService tokenService;

    @Autowired
    public ReviewController(ReviewService reviewService, TokenService tokenService) {
        this.reviewService = reviewService;
        this.tokenService = tokenService;
    }

    @PostMapping("/{itemId}")
    public ResponseEntity<?> reviewItem(@RequestBody ReviewDTO review, @PathVariable int itemId, HttpServletResponse req, @CookieValue(value = "Authentication") String token){
        if (review.getTitle() == null || review.getTitle().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Title must not be empty.");
        }
        if (review.getBody() == null || review.getBody().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Body must not be empty.");
        }
        Jws<Claims> parsedClaims = tokenService.parseToken(token);
        String username = parsedClaims.getPayload().get("username", String.class);
        try{
            return ResponseEntity.ok(reviewService.saveReview(review, username, itemId));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}
