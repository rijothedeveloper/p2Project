package com.revature.controllers;

import com.revature.services.FollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/follows")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class FollowController {

    FollowService followService;

    @Autowired
    public FollowController(FollowService followService) {
        this.followService = followService;
    }
}
