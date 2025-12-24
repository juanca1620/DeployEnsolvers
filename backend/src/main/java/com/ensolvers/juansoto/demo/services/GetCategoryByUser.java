package com.ensolvers.juansoto.demo.services;

import com.ensolvers.juansoto.demo.dto.CategoryResponseDto;
import com.ensolvers.juansoto.demo.entities.Category;
import com.ensolvers.juansoto.demo.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetCategoryByUser {

    @Autowired
    private CategoryRepository repository;

    public List<CategoryResponseDto> getCategoriesByUser (Integer userId){
        List<Category> categories = repository.findByUserId(userId);

        return categories.stream().map(category -> CategoryResponseDto.builder().id(category.getId()).name(category.getName()).build())
                .toList();
    }
}
