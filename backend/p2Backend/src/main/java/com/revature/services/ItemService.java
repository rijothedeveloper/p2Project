package com.revature.services;

import com.revature.daos.ItemDAO;
import com.revature.models.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private ItemDAO itemDAO;

    @Autowired
    public ItemService(ItemDAO itemDAO) {
        this.itemDAO = itemDAO;
    }

    public Item getItemById(int itemId) {
        Item item = itemDAO.findById(itemId).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + itemId));
        return item;
    }

    /* This method gets all Items */
    public List<Item> getAllItems(){
        return itemDAO.findAll();
    }

    /* This method updates an Item
    * parameters: JSON Item object in the body, and an itemId in the URL
    * */

    public Item updateItem(Item item, int itemId) {

        if(item.getName().isBlank() || item.getName() == null){
            throw new IllegalArgumentException("Item Name cannot be empty");
        }

        if(item.getDescription().isBlank() || item.getDescription() == null){
            throw new IllegalArgumentException("Item Description cannot be empty");
        }

        if(item.getCategory().isBlank() || item.getCategory() == null){
            throw new IllegalArgumentException("Item Category cannot be empty");
        }

        Item itemToBeSaved = itemDAO.findById(itemId).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + itemId));

        itemToBeSaved.setName(item.getName());
        itemToBeSaved.setDescription(item.getDescription());
        itemToBeSaved.setCategory(item.getCategory());
        itemToBeSaved.setRating(item.getRating());
        itemToBeSaved.setImage(item.getImage());

        itemDAO.save(itemToBeSaved);
        return itemToBeSaved;
    }

    /* This method updates an Item
     * parameters: itemId in the URL
     * */
    public Item deleteItem (int itemId) {
        Item item = itemDAO.findById(itemId).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + itemId));
        itemDAO.deleteById(itemId);
        return item;
    }

    /* This method find an Item Name
     * parameters: Specify value for an Item's Name - in the URL
     * */
    public Item getItemByName (String Name) {
        if(Name.isBlank() || Name== null){
            throw new IllegalArgumentException("Item Name cannot be empty");
        }

        Item item = itemDAO.findByName(Name).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + Name));
        return item;
    }


}
