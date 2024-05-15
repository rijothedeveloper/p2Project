package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

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
}
