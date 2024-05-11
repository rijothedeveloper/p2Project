package com.revature.controllers;

import com.revature.models.Item;
import com.revature.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/items")
@CrossOrigin //(origins = "http://localhost:3000", allowCredentials = "true")
public class ItemController {

    private ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<?> getAllItems() {
        try {
            return ResponseEntity.ok(itemService.getAllItems());
        }catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/{itemid}")
    public ResponseEntity <?> getItemById(@PathVariable int itemid) {
        try {
            return ResponseEntity.ok(itemService.getItemById(itemid));
        } catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping("/Name/{Name}")
    public ResponseEntity <?> getItemByName(@PathVariable String Name) {
        try {
            return ResponseEntity.ok(itemService.getItemByName(Name));
        } catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{itemid}")
    public ResponseEntity <Object> deleteItem(@PathVariable int itemid) {
        try {
            return ResponseEntity.ok(itemService.deleteItem(itemid));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PatchMapping("/{itemid}")
    public ResponseEntity <Object> updateItem(@RequestBody Item item, @PathVariable int itemid){
       try {
            return ResponseEntity.ok(itemService.updateItem(item, itemid));
        }catch (Exception e) {
            return ResponseEntity.status(400).body("Update item failed");
        }
    }
}
