package com.revature.daos;

import com.revature.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemDAO extends JpaRepository<Item,Integer> {
    public Optional<Item> findByName(String name);
    /**
     * Retrieves a list of items belonging to the specified category.
     *
     * @param category The category to search for.
     * @return A list of items belonging to the specified category.
     */
    List<Item> findByCategory(String Category);
}
