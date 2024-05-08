package com.revature.services;

import com.revature.daos.FollowDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowService {

    FollowDAO followDAO;

    @Autowired
    public FollowService(FollowDAO followDAO) {
        this.followDAO = followDAO;
    }
}
