package com.revature.daos;

import com.revature.models.Producer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface ProducerDAO extends JpaRepository<Producer,Integer> {

    public Optional<Producer> findById(int id);
}
