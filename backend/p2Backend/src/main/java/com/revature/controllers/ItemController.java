package com.revature.controllers;

import com.revature.models.Item;
import com.revature.models.dtos.ItemDTO;
import com.revature.services.ItemService;
import com.revature.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
@CrossOrigin (origins = "http://localhost:3000", allowCredentials = "true")
public class ItemController {

    private ItemService itemService;
    private JwtTokenUtil jwtUtil;

    @Autowired
    public ItemController(ItemService itemService, JwtTokenUtil jwtUtil) {
        this.itemService = itemService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addItem(@RequestBody ItemDTO itemdto) {
        try {
            Item item = itemService.addItem(itemdto);
            return ResponseEntity.status(201).body(item.getName() + " has been added");
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllItems() {
        try {
            return ResponseEntity.ok(itemService.getAllItems());
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/id/{itemId}")
    public ResponseEntity<?> getItemById(@PathVariable int itemId) {
        try {
            return ResponseEntity.ok(itemService.getItemById(itemId));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/name/{Name}")
    public ResponseEntity<?> getItemByName(@PathVariable String Name) {
        try {
            return ResponseEntity.ok(itemService.getItemByName(Name));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<Object> deleteItem(@PathVariable int itemId, @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        int userId = jwtUtil.extractUserId(jwt);
        if (userId == 0) {
            return ResponseEntity.status(401).body("You must be logged in to delete an item");
        }
        String role = jwtUtil.extractRole(jwt).toLowerCase();
        if(!role.equals(("admin"))) {
            return ResponseEntity.status(403).body("You must be an admin to delete an item");
        }
        try {
            return ResponseEntity.ok(itemService.deleteItem(itemId));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    //@PatchMapping("/{itemId}")
    @PatchMapping("/new/{itemId}")
    public ResponseEntity<Object> updateItem(@RequestBody Item item, @PathVariable int itemId) {
        try {
            return ResponseEntity.ok(itemService.updateItem(item, itemId));
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Update item failed");
        }
    }

    /**
     * Retrieves items belonging to the specified category and returns them as a ResponseEntity.
     *
     * @param category The category to search for.
     * @return ResponseEntity containing the list of items found in the specified category, or an error message if no items are found.
     */
    @GetMapping("/{category}")
    public ResponseEntity<Object> findItemByCategory(@PathVariable String category) {

        try {
            return ResponseEntity.ok().body(itemService.findItemByCategory(category));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

}
