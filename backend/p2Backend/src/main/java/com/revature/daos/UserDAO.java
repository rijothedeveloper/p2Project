package com.revature.daos;

import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User,Integer> {
  
    boolean existsByUsername(String username);

    User findByUsername(String username);

    Optional<User> findOptionalByUsername(String username);

}
