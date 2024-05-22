package com.revature.services;

import com.revature.daos.CollectionDAO;
import com.revature.daos.ItemDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Collection;
import com.revature.models.CollectionKey;
import com.revature.models.Item;
import com.revature.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.models.dtos.AddItemToCollectionDTO;
import java.util.List;
import java.util.List;

@Service
public class CollectionService {

    private CollectionDAO collectionDAO;

    private UserDAO userDAO;

    private ItemDAO itemDAO;

    @Autowired
    public CollectionService(CollectionDAO collectionDAO, UserDAO userDAO, ItemDAO itemDAO) {
        this.collectionDAO = collectionDAO;
        this.userDAO = userDAO;
        this.itemDAO = itemDAO;
    }


    public List<Item> getCollection(int userId) {

//        return collectionDAO.findAllByIdUserId(userId).stream().map(collection -> collection.getId().getItem()).toList();

        // my playground
        List<Collection> collectionDAOResponse = collectionDAO.findByIdUserId(userId);
        System.out.println("In collection service got collection below: ");
        System.out.println(collectionDAOResponse);
        collectionDAOResponse.forEach(item -> System.out.println(item));
        return collectionDAOResponse.stream().map(collectionKey -> collectionKey.getId().getItem()).toList();
    }

    /*
     * Create a new CollectionKey. Users can create a new CollectionKey
     * @param userId and itemId to create a new CollectionKey, and then
     *               create a Collection object using the newly created CollectionKey
     * @return the newly created Collection item
     * @throws IllegalArgumentException if either user or item is not found
     */
    public Collection addItemToCollection(AddItemToCollectionDTO addItemToCollectionDTO) throws IllegalArgumentException {

        int userId = addItemToCollectionDTO.getUserId();
        int itemId = addItemToCollectionDTO.getItemId();

        if (userId <= 0) {
            throw new IllegalArgumentException("User ID must be greater than zero");
        }
        if (itemId <= 0) {
            throw new IllegalArgumentException("Item ID must be greater than zero");
        }

        User user = userDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + userId));
        Item item = itemDAO.findById(itemId).orElseThrow(() -> new IllegalArgumentException("No Item found for ID: " + itemId));
        CollectionKey collectionkey = new CollectionKey(item, user);
        Collection collection = new Collection (collectionkey);
        return collectionDAO.save(collection);
    }

    public void deleteCollectionItemById(int itemId, int userId) {
        Item item = itemDAO.findById(itemId).orElseThrow(() -> new IllegalArgumentException("No item found for ID: " + itemId));
        User user = userDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + userId));
        CollectionKey collectionkey = new CollectionKey(item, user);
        Collection collection = collectionDAO.findById(collectionkey).orElseThrow(() -> new IllegalArgumentException("No collection found for item ID: " + itemId + " and user ID: " + userId));
        user.getCollection().remove(collection);
        item.getCollections().remove(collection);
        collectionDAO.delete(collection);
    }

    public Object getCollectionItemById(int itemId, int userId) {
        Item item = itemDAO.findById(itemId).orElseThrow(() -> new IllegalArgumentException("No item found for ID: " + itemId));
        User user = userDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + userId));
        return collectionDAO.findById(new CollectionKey(item, user)).orElseThrow(() -> new IllegalArgumentException("No collection found for item ID: " + itemId + " and user ID: " + userId));
    }
}