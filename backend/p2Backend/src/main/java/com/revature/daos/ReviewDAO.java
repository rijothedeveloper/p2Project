package com.revature.daos;

import com.revature.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewDAO extends JpaRepository<Review,Integer> {
    public List<Review> findAllByUserId(int Id);
}
