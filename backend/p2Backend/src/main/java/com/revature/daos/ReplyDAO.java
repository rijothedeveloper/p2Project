package com.revature.daos;

import com.revature.models.Reply;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyDAO extends JpaRepository<Reply,Integer> {

//    @Modifying
//    @Transactional
//    @Query("delete from Reply r where r.user.userId = :userId")
//    void deleteByReplyUserId(int userId);
}
