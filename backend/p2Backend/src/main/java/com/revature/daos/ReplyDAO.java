package com.revature.daos;

import com.revature.models.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyDAO extends JpaRepository<Reply,Integer> {

}
