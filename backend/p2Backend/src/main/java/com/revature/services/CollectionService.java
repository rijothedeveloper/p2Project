package com.revature.services;

import com.revature.daos.CollectionDAO;
import com.revature.models.Collection;
import com.revature.models.CollectionKey;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CollectionService {

    CollectionDAO collectionDAO;

    public CollectionService(CollectionDAO collectionDAO) {
        this.collectionDAO = collectionDAO;
    }


    public List<Collection> getCollection(int userId) {
        return collectionDAO.findAllByIdUserId(userId);


        //having trouble getting the custom DAO method to work so this is a quasi-temporary soltuion
        //return  collectionDAO.findAll().stream().filter(collection -> {return collection.getId().getUser().getId() == userId;}).toList();
    }
}