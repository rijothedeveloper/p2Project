package com.revature.controllers;


import com.revature.daos.UserDAO;
import com.revature.models.dtos.IncomingUserDTO;
import com.revature.services.TokenService;
import com.revature.models.User;
import com.revature.models.dtos.OutgoingUserDTO;
import com.revature.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;
    @Autowired
    public UserController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;

    }

    @PostMapping("/authenticate")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void login(@RequestBody IncomingUserDTO userDTO, HttpServletResponse response) throws Exception{
        if(userService.authenticate(userDTO)) {
            Map<String, String> claims = new HashMap<>();
            claims.put("username", userDTO.getUsername());

            String token = tokenService.generateToken(claims);

            Cookie cookie = new Cookie("Authentication",token);
            cookie.setDomain("localhost");
            cookie.setPath("/");
            response.addCookie(cookie);
        }else {
            throw  new Exception("username/password incorrect");
        }
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
