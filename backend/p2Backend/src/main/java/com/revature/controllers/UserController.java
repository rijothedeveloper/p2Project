package com.revature.controllers;


import com.revature.daos.UserDAO;
import com.revature.models.User;
import com.revature.models.dtos.OutgoingUserDTO;
import com.revature.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;

    }

    @GetMapping("/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.findUserByUsername(username);

        if (user.isPresent()) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username does not exist");
        }

    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteAccount(HttpSession session, @PathVariable int userId){

//        Integer userId = (Integer) session.getAttribute("userId");
//        if(userId == null){
//            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You must be logged in to delete an account");
//        }
        userService.deleteAccount(userId);
        return ResponseEntity.ok("Account Deleted Successfully");
    }
}
