package com.revature.controllers;

import com.revature.models.Collection;
import com.revature.models.Item;
import com.revature.services.CollectionService;
import com.revature.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.revature.models.dtos.AddItemToCollectionDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/collections")
@CrossOrigin // (origins = "http://localhost:3000", allowCredentials = "true")
public class CollectionController {

    private CollectionService collectionService;
    private JwtTokenUtil jwtUtil;

    @Autowired
    public CollectionController(CollectionService collectionService, JwtTokenUtil jwtUtil) {
        this.collectionService = collectionService;
        this.jwtUtil = jwtUtil;
    }

    //get all items in the user's collection
    @GetMapping("/my_collection")
    public ResponseEntity<?> getCollection(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);

        //if the user is logged in, call userService.getCollection(), otherwise, return an empty list
        return userId == 0 ? ResponseEntity.status(HttpStatus.FORBIDDEN).body("You must be logged in to view your collection")
                : ResponseEntity.ok(collectionService.getCollection(userId));
    }

    @PostMapping
    public ResponseEntity<String> addItemToCollection(@RequestBody AddItemToCollectionDTO addItemToCollectionDTO, @RequestHeader("Authorization") String token) {

        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId != addItemToCollectionDTO.getUserId()) {
            return ResponseEntity.status(401).body("You must be logged in to add an item to your collection");
        }

        try {
            Collection collection = collectionService.addItemToCollection(addItemToCollectionDTO);
            return ResponseEntity.status(201).body("Item : " + collection.getId().getItem().getName() + " : has been added to user's collection for Username : " + collection.getId().getUser().getUsername());
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
