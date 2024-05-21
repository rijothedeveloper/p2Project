package com.revature.services;

import com.revature.daos.FollowDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Follow;
import com.revature.models.FollowKey;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
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
    // Follow a user
    public Follow followUser(int targetUserId, int userId) {
        // Check if the user is trying to follow themselves
        if (userId == targetUserId) {
            throw new RuntimeException("You cannot follow yourself.");
        }
        // Check if the user and target user exist
        Optional<User> user = userDAO.findById(userId);
        Optional<User> targetUser = userDAO.findById(targetUserId);

        if (user.isEmpty() || targetUser.isEmpty()) {
            throw new RuntimeException("User not found.");
        }
        // Create a new follow object
        FollowKey key = new FollowKey(user.get(), targetUser.get());
        Follow follow = new Follow(key);
        return followDAO.save(follow);
    }
    // Unfollow a user
    public void unfollowUser(int targetUserId, int userId) {
            // Check if the user and target user exist
            Optional<User> user = userDAO.findById(userId);
            Optional<User> targetUser = userDAO.findById(targetUserId);

            if (user.isEmpty() || targetUser.isEmpty()) {
                throw new RuntimeException("User not found.");
            }
            FollowKey key = new FollowKey(user.get(), targetUser.get());
            followDAO.deleteById(key);
    }

    // Get a list of users that the user is following
//public List<User> getFollowing(int userId) {
        //return followDAO.findAllByIdFollowerId(userId).stream().map(follow -> follow.getId().getFollowingUser()).toList();
    //}
}
