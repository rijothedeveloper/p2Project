package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.models.User;

import com.revature.models.dtos.OutgoingUserDTO;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Optional<OutgoingUserDTO> findUserByUsername(String username){

        Optional<User> user = userDAO.findByUsername(username);

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
