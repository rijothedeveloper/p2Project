package com.revature.daos;

import com.revature.models.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewDAO extends JpaRepository<Review,Integer> {


//    @Modifying
//    @Transactional
//    @Query("delete from Review r where r.user.userId = :userId")
//    void deleteByReviewsUserId(int userId);
}
