package com.revature.services;

import com.revature.daos.CollectionDAO;
import org.springframework.stereotype.Service;

@Service
public class CollectionService {

    CollectionDAO collectionDAO;

    public CollectionService(CollectionDAO collectionDAO) {
        this.collectionDAO = collectionDAO;
    }

}
