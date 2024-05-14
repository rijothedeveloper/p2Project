package com.revature.controllers;

import com.revature.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.revature.models.Item;
import com.revature.models.dtos.ItemDTO;
import com.revature.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
@CrossOrigin (origins = "http://localhost:3000", allowCredentials = "true")
public class ItemController {

    private ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
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
        }catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/id/{itemId}")
    public ResponseEntity <?> getItemById(@PathVariable int itemId) {
        try {
            return ResponseEntity.ok(itemService.getItemById(itemId));
        } catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/name/{Name}")
    public ResponseEntity <?> getItemByName(@PathVariable String Name) {
        try {
            return ResponseEntity.ok(itemService.getItemByName(Name));
        } catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity <Object> deleteItem(@PathVariable int itemId) {
        try {
            return ResponseEntity.ok(itemService.deleteItem(itemId));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PatchMapping("/{itemId}")
    public ResponseEntity <Object> updateItem(@RequestBody Item item, @PathVariable int itemId){
       try {
            return ResponseEntity.ok(itemService.updateItem(item, itemId));
        }catch (Exception e) {
            return ResponseEntity.status(400).body("Update item failed");
        }
    }
}
