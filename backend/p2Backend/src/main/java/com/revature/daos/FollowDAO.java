package com.revature.daos;


import com.revature.models.Follow;
import com.revature.models.FollowKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowDAO extends JpaRepository<Follow, FollowKey> {

}
