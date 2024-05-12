package com.revature.controllers;


import com.revature.daos.UserDAO;
import com.revature.models.dtos.IncomingUserDTO;
import com.revature.services.TokenService;
import com.revature.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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

}
