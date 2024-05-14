package com.revature.services;

import com.revature.daos.ReplyDAO;
import com.revature.daos.ReviewDAO;
import com.revature.daos.UserDAO;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserService {

    UserDAO userDAO;
    ReviewDAO reviewDAO;
    ReplyDAO replyDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public Optional<User> findUserByUsername(String username){

        return userDAO.findByUsername(username);
    }

    public void deleteAccount(int userId){

        User user= userDAO.findById(userId).orElseThrow(
                () -> new NoSuchElementException("User not found with id: " + userId));
        userDAO.deleteById(userId);
    }
}
