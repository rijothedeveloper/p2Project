package com.revature.daos;

import com.revature.models.Collection;
import com.revature.models.CollectionKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionDAO extends JpaRepository<Collection, CollectionKey> {
}
