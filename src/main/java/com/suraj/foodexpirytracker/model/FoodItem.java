package com.suraj.foodexpirytracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "food_items")
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer quantity;
    private LocalDate purchaseDate;
    private LocalDate expiryDate;

  
    public FoodItem() {}

    public FoodItem(String name, Integer quantity, LocalDate purchaseDate, LocalDate expiryDate) {
        this.name = name;
        this.quantity = quantity;
        this.purchaseDate = purchaseDate;
        this.expiryDate = expiryDate;
    }

 
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public LocalDate getPurchaseDate() { return purchaseDate; }
    public void setPurchaseDate(LocalDate purchaseDate) { this.purchaseDate = purchaseDate; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
}
