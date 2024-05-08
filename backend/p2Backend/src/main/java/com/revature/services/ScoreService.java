package com.revature.services;


import com.revature.daos.ScoreDAO;
import org.springframework.stereotype.Service;

@Service
public class ScoreService {

        ScoreDAO scoreDAO;

        public ScoreService(ScoreDAO scoreDAO) {
            this.scoreDAO = scoreDAO;
        }
}
