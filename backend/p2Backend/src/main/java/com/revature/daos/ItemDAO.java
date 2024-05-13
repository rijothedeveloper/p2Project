package com.revature.daos;

import com.revature.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemDAO extends JpaRepository<Item,Integer> {
    public Optional<Item> findByName(String name);
}
