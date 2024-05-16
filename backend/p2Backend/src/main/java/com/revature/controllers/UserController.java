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
import org.springframework.security.core.token.TokenService;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.web.server.ResponseStatusException;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    UserService userService;
    private final String EMAIL_REGEX =
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
                    "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    private final Pattern pattern = Pattern.compile(EMAIL_REGEX);


    //autowire a JwtTokenUtil and AuthenticationManager
    private AuthenticationManager authManager;
    private JwtTokenUtil jwtUtil;


    private PasswordEncoder passwordEncoder; //SPRING SECURITY - lets us encode our passwords


    @Autowired
    public UserController(UserService userService, AuthenticationManager authManager, JwtTokenUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody IncomingUserDTO input) {
        try {
            //attempt to log in (notice no direct calls of the DAO)
            //this is where the username and password go to get validated
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(input.getUsername(), input.getPassword())
            );

            //build up the user based on the validation
            User user = (User) authentication.getPrincipal();

            //if the user is valid, generate our JWT!
            String jwt = jwtUtil.generateAccessToken(user);

//            System.out.println("ACCESS TOKEN---------------------- " + jwt);


            //create our OutgoingUserDTO to send back
            OutgoingUserDTO userOut = new OutgoingUserDTO(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getUsername(),
                    user.getRole(),
                    user.getEmail(),
                    user.getTimestamp(),
                    jwt);

            //send the OutgoingUserDTO (now with JWT!) back with a 200 status code
            return ResponseEntity
                    .status(HttpStatus.OK)//200
                    .body(userOut);

        } catch (Exception e) {
            //if login fails, return a 401 (UNAUTHORIZED) and the exception message
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED) //401
                    .body(e.getMessage());
        }
    }



    public User convertUserFromIncomingUserDTO(IncomingUserDTO input) {

        User user = new User();
        user.setUsername(input.getUsername());
        user.setPassword(input.getPassword());
        user.setFirstName("");
        user.setLastName("");
        user.setRole("");
        user.setEmail("");
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
        String formattedDateTime = now.format(formatter);
        user.setTimestamp(formattedDateTime);
        user.setFollow(Collections.emptyList());
        user.setCollection(Collections.emptyList());

        return user;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addUser(@RequestBody CreateUserDTO input) {

        if (input.getUsername().isEmpty() ||
                input.getPassword().isEmpty()||
                input.getFirstName().isEmpty()||
                input.getLastName().isEmpty()||
                input.getEmail().isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)//400
                    .body("Invalid input: User information cannot be empty");
        }

        if(!isValidEmail(input.getEmail())){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)//400
                    .body("Invalid email: User email format incorrect");
        }


        User user = convertUserFromCreateUserDTO(input);

        if (userService.isUsernameDuplicate(user)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)//409
                    .body("Username already exists");
        }

        Optional<User> addedUser = Optional.ofNullable(userService.addUser(user));

        if (addedUser.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)//500
                    .body("Failed to add user: User information is invalid");
        }

        return ResponseEntity
                .status(HttpStatus.CREATED) //201
                .body("User added successfully");
    }

    public boolean isValidEmail(String email) {
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public User convertUserFromCreateUserDTO(CreateUserDTO input){

        User user = new User();
        user.setUsername(input.getUsername());
        user.setPassword(input.getPassword());
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setRole("USER");
        user.setEmail(input.getEmail());
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
        String formattedDateTime = now.format(formatter);
        user.setTimestamp(formattedDateTime);
        user.setFollow(Collections.emptyList());
        user.setCollection(Collections.emptyList());

        return user;
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> findUserByUsername(@PathVariable String username) {
      
        Optional<OutgoingUserDTO> userDTO = userService.findUserByUsername(username);

        if (userDTO.isPresent()) {
            return ResponseEntity.ok(userDTO.get());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Username does not exist");
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
