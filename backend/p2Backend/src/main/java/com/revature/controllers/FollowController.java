package com.revature.controllers;

import com.revature.services.FollowService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follows")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FollowController {

    FollowService followService;

    @Autowired
    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping("/new_follow/{targetUserId}")
    public ResponseEntity<Object> followUser(@PathVariable int targetUserId, HttpSession session) {

        if ((int) session.getAttribute("userId") == 0) {
            return ResponseEntity.status(401).body("You must be logged in to follow a user.");
        }

        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(followService.followUser(targetUserId, (int) session.getAttribute("userId")));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @DeleteMapping("/unfollow/{targetUserId}")
    public ResponseEntity<Object> unfollowUser(@PathVariable int targetUserId, HttpSession session) {

        if ((int) session.getAttribute("userId") == 0) {
            return ResponseEntity.status(401).body("You must be logged in to unfollow a user.");
        }

        try {
            followService.unfollowUser(targetUserId, (int) session.getAttribute("userId"));
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
