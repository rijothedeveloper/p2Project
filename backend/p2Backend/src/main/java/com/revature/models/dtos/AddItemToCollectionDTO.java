package com.revature.models.dtos;

public class AddItemToCollectionDTO {
    private int userId;
    private int itemId;

    public AddItemToCollectionDTO() {
    }

    public AddItemToCollectionDTO(int userId, int itemId) {
        this.userId = userId;
        this.itemId = itemId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    @Override
    public String toString() {
        return "AddItemToCollectionDTO{" +
                "userId=" + userId +
                ", itemId=" + itemId +
                '}';
    }
}
