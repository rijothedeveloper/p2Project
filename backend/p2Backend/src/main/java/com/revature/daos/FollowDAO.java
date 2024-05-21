package com.revature.daos;


import com.revature.models.Follow;
import com.revature.models.FollowKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface FollowDAO extends JpaRepository<Follow, FollowKey> {

    //List<Follow> findAllByIdFollowerId(int userId);
}
