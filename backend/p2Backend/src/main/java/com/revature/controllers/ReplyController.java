package com.revature.controllers;

import com.revature.models.Reply;
import com.revature.models.dtos.ReplyDTO;
import com.revature.services.ReplyService;
import com.revature.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/replies")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReplyController {
    ReplyService replyService;
    JwtTokenUtil jwtUtil;

    @Autowired
    public ReplyController(ReplyService replyService, JwtTokenUtil jwtUtil) {
        this.replyService = replyService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<Object> addReply(@RequestBody ReplyDTO reply, @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            throw new RuntimeException("You must be logged in to reply to a review");
        }

        Reply newReply;
        try {
            newReply = replyService.addReply( userId, reply);
            return ResponseEntity.status(201).body(newReply);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }


    @GetMapping("/{reviewId}")
    public ResponseEntity<List<ReplyDTO>>getAllRepliesForReview(@PathVariable("reviewId") int reviewId){
        List<ReplyDTO> replies = replyService.getAllRepliesForReview(reviewId);
        return ResponseEntity.ok(replies);
    }
}
