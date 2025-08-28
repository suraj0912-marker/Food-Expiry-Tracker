package com.suraj.foodexpirytracker.service;

import com.suraj.foodexpirytracker.model.FoodItem;
import com.suraj.foodexpirytracker.repository.FoodItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService {

    private final FoodItemRepository foodItemRepository;

    public FoodItemService(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

   
    public FoodItem addFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }


    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

 
    public Optional<FoodItem> getFoodItemById(Long id) {
        return foodItemRepository.findById(id);
    }

  
    public FoodItem updateFoodItem(Long id, FoodItem updatedFoodItem) {
        return foodItemRepository.findById(id)
                .map(existing -> {
                    existing.setName(updatedFoodItem.getName());
                    existing.setQuantity(updatedFoodItem.getQuantity());
                    existing.setPurchaseDate(updatedFoodItem.getPurchaseDate());
                    existing.setExpiryDate(updatedFoodItem.getExpiryDate());
                    return foodItemRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Food Item not found"));
    }

    public void deleteFoodItem(Long id) {
        foodItemRepository.deleteById(id);
    }
}
