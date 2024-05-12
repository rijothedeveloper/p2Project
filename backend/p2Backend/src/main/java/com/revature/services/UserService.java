package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.User;
import com.revature.models.dtos.IncomingUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public boolean authenticate(IncomingUserDTO userDTO) {
        Optional<User> user = userDAO.findByUsername(userDTO.getUsername());
        if(user.isPresent()) {
            return userDTO.getPassword().equals(user.get().getPassword());
        }
        return false;
    }
}
