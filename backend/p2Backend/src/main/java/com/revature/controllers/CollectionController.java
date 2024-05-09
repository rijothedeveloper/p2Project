package com.revature.controllers;

import com.revature.models.Collection;
import com.revature.services.CollectionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/collections")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CollectionController {

    CollectionService collectionService;

    @Autowired
    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }


    @GetMapping("/my_collection")
    public ResponseEntity<List<Collection>> getCollection(HttpSession session) {

        int userId = 1;
        //int userId = (int) session.getAttribute(("userId"));

        //if the user is logged in, call userService.getCollection(), otherwise, return an empty list
        return userId == 0? ResponseEntity.ok(new ArrayList<Collection>()) : ResponseEntity.ok(collectionService.getCollection(userId));
    }

}
