package com.revature.controllers;

import com.revature.services.FollowService;
import com.revature.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/follows")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FollowController {

    private FollowService followService;
    private JwtTokenUtil jwtUtil;

    @Autowired
    public FollowController(FollowService followService, JwtTokenUtil jwtUtil) {
        this.followService = followService;
        this.jwtUtil = jwtUtil;
    }

    //follow a user
    //@PostMapping("/{targetUserId}")
    @PostMapping("/follow/{targetUserId}")
    public ResponseEntity<Object> followUser(@PathVariable int targetUserId, @RequestHeader("Authorization") String token) {
        //if user is not logged in, return 401
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to follow a user.");
        }
        //try to follow user, return 500 if error
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(followService.followUser(targetUserId, userId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    //unfollow a user
    @DeleteMapping("/{targetUserId}")
    public ResponseEntity<Object> unfollowUser(@PathVariable int targetUserId, @RequestHeader("Authorization") String token) {
        //if user is not logged in, return 401
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to unfollow a user.");
        }
        //try to unfollow user, return 500 if error
        try {
            followService.unfollowUser(targetUserId, userId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
