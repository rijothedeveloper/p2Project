package com.revature.controllers;

import com.revature.models.Collection;
import com.revature.models.Item;
import com.revature.models.dtos.itemIDDTO;
import com.revature.services.CollectionService;
import com.revature.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.revature.models.dtos.AddItemToCollectionDTO;
import java.util.ArrayList;
import java.util.List;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/collections")
@CrossOrigin  (origins = "http://localhost:3000", allowCredentials = "true")
public class CollectionController {

    CollectionService collectionService;

    @Autowired
    public CollectionController(CollectionService collectionService) {
        this.collectionService = collectionService;
    }
    @Autowired
    public JwtTokenUtil jwtTokenUtil;


    @GetMapping("/my_collection")
    public ResponseEntity<List<Item>> getCollection(@RequestHeader("Authorization") String token) {

//        int userId = 1;
//        int userId = (int) session.getAttribute(("userId"));
        String jwt = token.substring(7); //remove "Bearer " from the token
        int userId = jwtTokenUtil.extractUserId(jwt); //send the jwt to the util to extract userId
//        System.out.println("User ID in my_collection controller: " + userId);

        //if the user is logged in, call userService.getCollection(), otherwise, return an empty list
        return userId == 0? ResponseEntity.ok(new ArrayList<Item>()) : ResponseEntity.ok(collectionService.getCollection(userId));
    }

    @PostMapping
    public ResponseEntity<String> addItemToCollection(@RequestHeader("Authorization") String token, @RequestBody itemIDDTO itemId) {
        String jwt = token.substring(7); //remove "Bearer " from the token
        int userId = jwtTokenUtil.extractUserId(jwt); //send the jwt to the util to extract userId
        AddItemToCollectionDTO item = new AddItemToCollectionDTO(userId, itemId.getItemId());
        try {
            Collection collection = collectionService.addItemToCollection(item);
            return ResponseEntity.status(201).body("Item : " + collection.getId().getItem().getName() + " : has been added to user's collection for Username : " + collection.getId().getUser().getUsername());
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteCollectionItemById(@RequestHeader("Authorization") String token, @PathVariable int itemId) {
        String jwt = token.substring(7);
        int userId = jwtTokenUtil.extractUserId(jwt);
        try {
            collectionService.deleteCollectionItemById(itemId, userId);
            return ResponseEntity.ok("Item successfully deleted from user's collection");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/id/{itemId}/user/{userId}")
    public ResponseEntity<?> getCollectionItemById(@PathVariable int itemId, @PathVariable int userId) {
        try {
            return ResponseEntity.ok(collectionService.getCollectionItemById(itemId, userId));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
