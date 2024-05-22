package com.revature.services;

import com.revature.daos.*;
import com.revature.models.*;
import com.revature.models.dtos.CreateUserDTO;
import com.revature.models.dtos.IncomingUserDTO;
import com.revature.models.dtos.OutgoingUserDTO;
import com.revature.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.swing.text.html.Option;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class UserService {

    UserDAO userDAO;
    ReviewDAO reviewDAO;
    private AuthenticationManager authManager;
    private JwtTokenUtil jwtUtil;
    private PasswordEncoder passwordEncoder;
    private CollectionDAO collectionDAO;
    private ScoreDAO scoreDAO;
    private FollowDAO followDAO;
    private ReplyDAO replyDAO;

    private final String EMAIL_REGEX =
            "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
                    "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
    private final Pattern pattern = Pattern.compile(EMAIL_REGEX);

    @Autowired
    public UserService(UserDAO userDAO, AuthenticationManager authManager, JwtTokenUtil jwtUtil, PasswordEncoder passwordEncoder, ReviewDAO reviewDAO, CollectionDAO collectionDAO, ScoreDAO scoreDAO, FollowDAO followDAO, ReplyDAO replyDAO) {
        this.userDAO = userDAO;
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.reviewDAO = reviewDAO;
        this.collectionDAO = collectionDAO;
        this.scoreDAO = scoreDAO;
        this.followDAO = followDAO;
        this.replyDAO = replyDAO;
    }

    public ResponseEntity<Object> addUser(CreateUserDTO input) {
        try {
            if (input.getUsername().isEmpty() ||
                    input.getPassword().isEmpty() ||
                    input.getFirstName().isEmpty() ||
                    input.getLastName().isEmpty() ||
                    input.getEmail().isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)//400
                        .body("Invalid input: User information cannot be empty");
            }

            if (!isValidEmail(input.getEmail())) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)//400
                        .body("Invalid email: User email format incorrect");
            }

            if (userDAO.existsByUsername(input.getUsername())) {
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)//409
                        .body("Username already exists");
            }
            User user = convertUserFromCreateUserDTO(input);
            userDAO.save(user);
            return ResponseEntity
                    .status(HttpStatus.CREATED) //201
                    .body("User added successfully");


        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)//500
                    .body("Failed to add user: User information is invalid");
        }
    }

    public ResponseEntity<Object> login(IncomingUserDTO input) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(input.getUsername(), input.getPassword())
            );
            User user = (User) authentication.getPrincipal();
            String jwt = jwtUtil.generateAccessToken(user);

            OutgoingUserDTO userOut = convertOutgoingUserDTOFromIncomingUserDTO(user, jwt);

            return ResponseEntity
                    .status(HttpStatus.OK)//200
                    .body(userOut);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED) //401
                    .body("Failed to Login: " + e.getMessage());
        }
    }

    public User getUser(String username) {
        return userDAO.findByUsername(username);
    }

    public List<OutgoingUserDTO> getAllUsers(String token) {
        if (jwtUtil.validateAccessToken(token)) {
            String username = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);
            Optional<User> user = userDAO.findOptionalByUsername(username);

            if (user.isPresent() && role.equals("ADMIN")) {
                List<User> users = userDAO.findAll();
                return users.stream()
                        .map(this::convertOutgoingUserDTOFromUser)
                        .collect(Collectors.toList());
            }
        }

        return Collections.emptyList();
    }

//    ==================================================================helper methods

    public Optional<OutgoingUserDTO> findUserByUsername(String username) {

        Optional<User> user = Optional.ofNullable(userDAO.findByUsername(username));

        if (user.isPresent()) {
            User u = user.get();
            OutgoingUserDTO uout = new OutgoingUserDTO(
                    u.getId(),
                    u.getFirstName(),
                    u.getLastName(),
                    u.getUsername(),
                    u.getRole(),
                    u.getEmail(),
                    u.getTimestamp()
            );
            return Optional.of(uout);
        } else {
            return Optional.empty();
        }
    }

    public boolean isValidEmail(String email) {
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public User convertUserFromCreateUserDTO(CreateUserDTO input) {
        User user = new User();
        user.setUsername(input.getUsername());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setFirstName(input.getFirstName());
        user.setLastName(input.getLastName());
        user.setRole("USER");
        user.setEmail(input.getEmail());
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
        String formattedDateTime = now.format(formatter);
        user.setTimestamp(formattedDateTime);
        user.setFollow(Collections.emptySet());
        user.setCollection(Collections.emptySet());

        return user;
    }

    public OutgoingUserDTO convertOutgoingUserDTOFromIncomingUserDTO(User input, String jwt) {
        OutgoingUserDTO userOut = new OutgoingUserDTO(
                input.getId(),
                input.getFirstName(),
                input.getLastName(),
                input.getUsername(),
                input.getRole(),
                input.getEmail(),
                input.getTimestamp(),
                jwt);

        return userOut;
    }

    public OutgoingUserDTO convertOutgoingUserDTOFromUser(User input) {
        OutgoingUserDTO userOut = new OutgoingUserDTO(
                input.getId(),
                input.getFirstName(),
                input.getLastName(),
                input.getUsername(),
                input.getRole(),
                input.getEmail(),
                input.getTimestamp());

        return userOut;
    }
    public User suspendUser(String username){
        Optional<User> userOptional = Optional.ofNullable(userDAO.findByUsername(username));
        if(userOptional.isEmpty()){
            throw new IllegalArgumentException("User does not exist!");
        }
        User user = userOptional.get();
        user.setRole("SUSPENDED");
        return userDAO.save(user);
    }

    public OutgoingUserDTO getUserByUsername(String username) {
        User user = userDAO.findByUsername(username);
        if (user == null) {
            return null;
        }
        return convertOutgoingUserDTOFromUser(user);
    }


    public ResponseEntity<Void> deleteAccount(int userId) {
        Optional<User> user = userDAO.findById(userId);
        if(user.isPresent()){
            //get all reviews and collecitons for user
            Set<Review> reviews = user.get().getReviews();
            Set<Collection> collections = user.get().getCollection();
            Set<Score> scores = user.get().getScores();
            Set<Follow> follows = user.get().getFollow();
            Set<Reply> replies = user.get().getReplies();

            for (Review review : reviews) {
                reviewDAO.delete(review);
            }
            for (Collection collection : collections) {
                collectionDAO.delete(collection); // assuming you have a CollectionDAO
            }

            for (Score score : scores) {
                scoreDAO.delete(score);
            }

            for (Follow follow : follows) {
                followDAO.delete(follow);
            }

            for (Reply reply : replies) {
                replyDAO.delete(reply);
            }

            //delete user
            userDAO.delete(user.get());
            return new ResponseEntity<Void>(HttpStatus.OK);
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

}
