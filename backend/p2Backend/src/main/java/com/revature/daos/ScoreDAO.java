package com.revature.daos;

import com.revature.models.Score;
import com.revature.models.ScoreKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScoreDAO extends JpaRepository<Score, ScoreKey> {
}
