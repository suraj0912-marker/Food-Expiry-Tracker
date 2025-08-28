package com.suraj.foodexpirytracker.repository;

import com.suraj.foodexpirytracker.model.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
  
}
