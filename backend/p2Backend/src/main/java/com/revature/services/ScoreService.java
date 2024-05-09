package com.revature.services;

import com.revature.daos.ScoreDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {

    private ScoreDAO scoreDAO;

    @Autowired
    public ScoreService(ScoreDAO scoreDAO) {
        this.scoreDAO = scoreDAO;
    }
}
