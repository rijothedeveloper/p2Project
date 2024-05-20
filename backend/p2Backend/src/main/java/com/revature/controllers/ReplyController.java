package com.revature.controllers;

import com.revature.models.Reply;
import com.revature.models.dtos.ReplyDTO;
import com.revature.services.ReplyService;
import com.revature.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /**
     * Handles the HTTP DELETE request to delete a reply.
     *
     * @param id The ID of the reply to be deleted.
     * @return ResponseEntity containing a success message or an error message.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReply(@PathVariable int id, @RequestHeader("Authorization") String token){

        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        String role = jwtUtil.extractRole(jwt).toLowerCase();

        // Check if the user is logged in
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to delete a reply");
        }

        System.out.println("Role: " + role);
        // Check if the user is the author of the reply or an admin
        if (!replyService.isAuthor(userId, id) && !role.equals("admin")){
            return ResponseEntity.status(401).body("You must be the author of the review or an admin to delete a review.");
        }
        // Attempt to delete the reply
        try {
            replyService.deleteReply(id);
            return ResponseEntity.ok().body("Reply deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
