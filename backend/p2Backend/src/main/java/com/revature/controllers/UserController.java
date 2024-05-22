package com.revature.controllers;

import com.revature.models.dtos.IncomingUserDTO;
import com.revature.models.dtos.CreateUserDTO;
import com.revature.daos.UserDAO;
import com.revature.models.User;
import com.revature.models.dtos.OutgoingUserDTO;
import com.revature.services.UserService;
import com.revature.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    UserService userService;
    JwtTokenUtil jwtUtil;

    @Autowired
    public UserController(UserService userService, JwtTokenUtil jwtUtil){
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addUser(@RequestBody CreateUserDTO input) {
        return userService.addUser(input);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody IncomingUserDTO input) {
        return userService.login(input);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OutgoingUserDTO>> getAllUsersForManager(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        List<OutgoingUserDTO> userList = userService.getAllUsers(jwt);
        if (userList.isEmpty()) {
            return ResponseEntity
                    .notFound()//404
                    .build();
        } else {
            return ResponseEntity.ok(userList); //200
        }
    }
  
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<String> deleteAccount(@RequestHeader("Authorization") String token, @PathVariable int userId){
        String jwt = token.substring(7);
        int userIdFromToken = jwtUtil.extractUserId(jwt);
        if(userIdFromToken != userId){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this account. " +
                                                                        "Only the account owner can delete their own account.");
        }
        userService.deleteAccount(userId);
        return ResponseEntity.ok("Account Deleted Successfully");
    }

    @GetMapping("/user/{username}")
    public ResponseEntity<OutgoingUserDTO> getUserByUsername(@RequestHeader("Authorization") String token, @PathVariable String username) {
        String jwt = token.substring(7);

        OutgoingUserDTO user = userService.getUserByUsername(username);
        if (user == null) {
            return ResponseEntity
                    .notFound()//404
                    .build();
        } else {
            return ResponseEntity.ok(user); //200
        }
    }


    @PatchMapping("/suspend/{username}")
    public ResponseEntity<?> suspendUser(@PathVariable String username, @RequestHeader("Authorization") String token) {
        try {
            //Extract the username from the token
            String adminUsername = jwtUtil.extractUsername(token.substring(7));
            //get user obj
            User adminUser = userService.getUser(adminUsername);

            if (!adminUser.getRole().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not authorized to suspend users");
            }

            //check if the user to be suspended exists
            User userToSuspend = userService.getUser(username);

            if (userToSuspend == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User does not exist");
            }
            //check if the user to be suspended is an admin
            if (userToSuspend.getRole().equals("ADMIN")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot suspend another admin");
            }

            //suspend the user
            User suspendedUser = userService.suspendUser(username);

            if (suspendedUser.getRole().equals("SUSPENDED")) {
                return ResponseEntity.ok().body("User has been suspended");
            } else {
                return ResponseEntity.status((HttpStatus.INTERNAL_SERVER_ERROR)).body("Failed to suspend user");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}


// it will use for junit test in future. for checking emails
//    public static void main(String[] args) {
//        String[] emails = {
//                "example@example.com",    // Valid email
//                "user@example",           // Invalid email (missing .com)
//                "userexample.com",        // Invalid email (missing @)
//                "user@.com",              // Invalid email (missing username)
//                "@example.com",           // Invalid email (missing username)
//                "user@example..com",      // Invalid email (double dot in domain)
//                "user@.example.com"       // Invalid email (missing username)
//        };
//
//        for (String email : emails) {
//            System.out.println(email + " is " + (isValidEmail(email) ? "valid" : "invalid"));
//        }
//    }
