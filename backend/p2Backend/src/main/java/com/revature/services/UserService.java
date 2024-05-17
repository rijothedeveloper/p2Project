package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.User;
import com.revature.models.dtos.IncomingUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.models.dtos.OutgoingUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;

import java.util.Optional;

@Service
public class UserService {

    UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User addUser(User user) {
        try {
            return userDAO.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("Username already exists");
        }
    }

    public User login(User inputUser) {

        String username = inputUser.getUsername();
        String password = inputUser.getPassword();

        User user = userDAO.findByUsername(username);

        if (user == null || !user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        return user;
    }

    public User getUser(String username){
        return userDAO.findByUsername(username);
    }
  
    public boolean isUsernameDuplicate(User user) {
        return userDAO.existsByUsername(user.getUsername());
    }

    public Optional<OutgoingUserDTO> findUserByUsername(String username){

        Optional<User> user = Optional.ofNullable(userDAO.findByUsername(username));

        if(user.isPresent()){
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

}
