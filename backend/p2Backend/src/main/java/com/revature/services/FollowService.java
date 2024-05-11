package com.revature.services;

import com.revature.daos.FollowDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Follow;
import com.revature.models.FollowKey;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FollowService {

    FollowDAO followDAO;
    UserDAO userDAO;

    @Autowired
    public FollowService(FollowDAO followDAO, UserDAO userDAO) {
        this.userDAO = userDAO;
        this.followDAO = followDAO;
    }

    public Follow followUser(int targetUserId, int userId) {

        if (userId == targetUserId) {
            throw new RuntimeException("You cannot follow yourself.");
        }

        Optional<User> user = userDAO.findById(userId);
        Optional<User> targetUser = userDAO.findById(targetUserId);

        if (user.isEmpty() || targetUser.isEmpty()) {
            throw new RuntimeException("User not found.");
        }

        FollowKey key = new FollowKey(user.get(), targetUser.get());
        Follow follow = new Follow(key);
        return followDAO.save(follow);
    }

    public void unfollowUser(int targetUserId, int userId) {

            Optional<User> user = userDAO.findById(userId);
            Optional<User> targetUser = userDAO.findById(targetUserId);

            if (user.isEmpty() || targetUser.isEmpty()) {
                throw new RuntimeException("User not found.");
            }
            FollowKey key = new FollowKey(user.get(), targetUser.get());
            followDAO.deleteById(key);
    }
}
