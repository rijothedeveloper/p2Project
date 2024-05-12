package com.revature.daos;

import com.revature.models.Review;
import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewDAO extends JpaRepository<Review,Integer> {
    public Optional<Review> findByUserUsernameAndItemId(String username, int itemId);
}
