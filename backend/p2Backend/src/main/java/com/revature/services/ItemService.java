package com.revature.services;

import com.revature.daos.ItemDAO;
import com.revature.models.Item;
import com.revature.models.Producer;
import com.revature.models.dtos.ItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.daos.ProducerDAO;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private ItemDAO itemDAO;
    private ProducerDAO producerDAO;

    @Autowired
    public ItemService(ItemDAO itemDAO, ProducerDAO producerDAO) {
        this.itemDAO = itemDAO;
        this.producerDAO = producerDAO;
    }

    public Item addItem(ItemDTO itemdto) {
        if(itemdto.getName().isBlank() || itemdto.getName() == null){
            throw new IllegalArgumentException("Item Name cannot be empty");
        }

        if(itemdto.getDescription().isBlank() || itemdto.getDescription() == null){
            throw new IllegalArgumentException("Item Description cannot be empty");
        }

        if(itemdto.getCategory().isBlank() || itemdto.getCategory() == null) {
            throw new IllegalArgumentException("Item Category cannot be empty");
        }

        Optional<Producer> producer = producerDAO.findById(itemdto.getProducerId());
        if (producer.isEmpty()) {
            throw new IllegalArgumentException("No producer found for ID: " + itemdto.getProducerId());
        }

        Item item = new Item(itemdto.getName(), producer.get(), itemdto.getDescription(), itemdto.getCategory(), itemdto.getImage());
        itemDAO.save(item);
        return item;
    }

    /**
     * Retrieves a list of items belonging to the specified category.
     *
     * @param category The category to search for.
     * @return A list of item belonging to the specified category.
     * @throws IllegalArgumentException if no items are found in the specified category.
     */
    public List<Item> findItemByCategory(String category) {
        // Retrieve items from the database based on the specified category
        List<Item> items = itemDAO.findByCategory(category);

        if (items.isEmpty()) {
            throw new IllegalArgumentException("No item found in " + category + " category!");
        }
        return items;
    }

    public Item getItemById(int itemId) {
        return itemDAO.findById(itemId).orElseThrow(() -> new IllegalArgumentException("No item found with Id: " + itemId));
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

        Item itemToBeSaved = itemDAO.findById(itemId).orElseThrow(() -> new IllegalArgumentException("No item found with Id: " + itemId));

        itemToBeSaved.setName(item.getName());
        itemToBeSaved.setDescription(item.getDescription());
        itemToBeSaved.setCategory(item.getCategory());
        //itemToBeSaved.setRating(item.getRating());
        //itemToBeSaved.setImage(item.getImage());

        itemDAO.save(itemToBeSaved);
        return itemToBeSaved;
    }

    /* This method updates an Item
     * parameters: itemId in the URL
     * */
    public Item deleteItem (int itemId) {
        Item item = itemDAO.findById(itemId).orElseThrow(() -> new IllegalArgumentException("No item found with Id: " + itemId));
        item.getProducer().getItems().remove(item);

        itemDAO.deleteById(itemId);
        return item;
    }

    /* This method find an Item Name
     * parameters: Specify value for an Item's Name - in the URL
     * */
    public Item getItemByName (String Name) {
        if(Name.isBlank()){
            throw new IllegalArgumentException("Item Name cannot be empty");
        }
        return itemDAO.findByName(Name).orElseThrow(() -> new IllegalArgumentException("No item found named: " + Name));
    }
}
