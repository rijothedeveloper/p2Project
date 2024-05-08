package com.revature.models;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class CollectionKey implements Serializable{

    private int itemId;
    private int userId;

    public CollectionKey() {
    }

    public CollectionKey(int itemId, int userId) {
        this.itemId = itemId;
        this.userId = userId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "CollectionKey{" +
                "itemId=" + itemId +
                ", userId=" + userId +
                '}';
    }
}
