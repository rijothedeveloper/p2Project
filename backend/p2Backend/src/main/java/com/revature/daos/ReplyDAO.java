package com.revature.daos;

import com.revature.models.Reply;
import com.revature.models.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyDAO extends JpaRepository<Reply,Integer> {

//    @Modifying
//    @Transactional
//    @Query("delete from Reply r where r.user.userId = :userId")
//    void deleteByReplyUserId(int userId);

    List<Reply> findByReview(Review review);
}
