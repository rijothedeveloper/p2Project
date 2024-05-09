package com.revature.models.dtos;

public class ItemDTO {

    private String name;
    private int producerId;
    private String description;
    private String category;

    public ItemDTO() {
    }

    public ItemDTO(String name, int producerId, String description, String category) {
        this.name = name;
        this.producerId = producerId;
        this.description = description;
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getProducerId() {
        return producerId;
    }

    public void setProducerId(int producerId) {
        this.producerId = producerId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "IncomingItemDTO{" +
                "name='" + name + '\'' +
                ", producerId=" + producerId +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                '}';
    }
}
