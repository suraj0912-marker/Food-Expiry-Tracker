package com.suraj.foodexpirytracker.controller;

import com.suraj.foodexpirytracker.model.FoodItem;
import com.suraj.foodexpirytracker.service.FoodItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fooditems")
@CrossOrigin(origins = "*") // allow frontend to call APIs
public class FoodItemController {

    private final FoodItemService foodItemService;

    public FoodItemController(FoodItemService foodItemService) {
        this.foodItemService = foodItemService;
    }

    // Add new food item
    @PostMapping
    public FoodItem addFoodItem(@RequestBody FoodItem foodItem) {
        return foodItemService.addFoodItem(foodItem);
    }

    // Get all food items
    @GetMapping
    public List<FoodItem> getAllFoodItems() {
        return foodItemService.getAllFoodItems();
    }

    // Get food item by ID
    @GetMapping("/{id}")
    public FoodItem getFoodItemById(@PathVariable Long id) {
        return foodItemService.getFoodItemById(id)
                .orElseThrow(() -> new RuntimeException("Food Item not found"));
    }

    // Update food item
    @PutMapping("/{id}")
    public FoodItem updateFoodItem(@PathVariable Long id, @RequestBody FoodItem updatedFoodItem) {
        return foodItemService.updateFoodItem(id, updatedFoodItem);
    }

    // Delete food item
    @DeleteMapping("/{id}")
    public void deleteFoodItem(@PathVariable Long id) {
        foodItemService.deleteFoodItem(id);
    }
}
