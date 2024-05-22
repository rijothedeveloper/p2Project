package com.revature.daos;

import com.revature.models.User;
import com.revature.models.dtos.OutgoingUserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserDAO extends JpaRepository<User,Integer> {
  
    boolean existsByUsername(String username);

    User findByUsername(String username);

    Optional<User> findOptionalByUsername(String username);

    Object findByUsernameAndPassword(String username, String password);
}
