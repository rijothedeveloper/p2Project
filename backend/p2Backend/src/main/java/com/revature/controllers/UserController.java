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

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
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
