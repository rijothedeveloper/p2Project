package com.revature.models.dtos;

public class itemIDDTO {
    private int itemId;

    public itemIDDTO() {
    }

    public itemIDDTO(int itemId) {
        this.itemId = itemId;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    @Override
    public String toString() {
        return "itemIDDTO{" +
                "itemId=" + itemId +
                '}';
    }
}
