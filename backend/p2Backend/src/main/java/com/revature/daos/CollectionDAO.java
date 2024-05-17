package com.revature.daos;

import com.revature.models.Collection;
import com.revature.models.CollectionKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionDAO extends JpaRepository<Collection, CollectionKey> {
    //find all items in the user's collection
    List<Collection> findAllByIdUserId(int userId);

}
