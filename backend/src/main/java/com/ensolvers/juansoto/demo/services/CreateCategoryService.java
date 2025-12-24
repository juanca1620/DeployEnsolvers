package com.ensolvers.juansoto.demo.services;

import com.ensolvers.juansoto.demo.entities.Category;
import com.ensolvers.juansoto.demo.entities.User;
import com.ensolvers.juansoto.demo.repository.CategoryRepository;
import com.ensolvers.juansoto.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateCategoryService {

    @Autowired
    private CategoryRepository repository;

    @Autowired
    private UserRepository userRepository;

    public Category createCategory(String name, Integer userId) {
        User userReference = userRepository.getReferenceById(userId);

        Category category = Category.builder().user(userReference).name(name).build();

        return repository.save(category);
    }
}
