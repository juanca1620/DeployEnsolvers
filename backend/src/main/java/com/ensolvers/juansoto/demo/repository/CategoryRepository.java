package com.ensolvers.juansoto.demo.repository;

import com.ensolvers.juansoto.demo.entities.Category;
import com.ensolvers.juansoto.demo.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
    List<Category> findByUserId(Integer userId);
}
