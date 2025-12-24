package com.ensolvers.juansoto.demo.services;

import com.ensolvers.juansoto.demo.entities.Category;
import com.ensolvers.juansoto.demo.entities.Note;
import com.ensolvers.juansoto.demo.exceptions.ApiErrorException;
import com.ensolvers.juansoto.demo.repository.CategoryRepository;
import com.ensolvers.juansoto.demo.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AttachCategoryService {

    @Autowired
    private NotesRepository notesRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public void attachCategory(Integer noteId, Integer categoryId, Integer userId) {

        Note note = notesRepository.findById(noteId)
                .orElseThrow(() -> new ApiErrorException("Note not found with id: " + noteId));

        if (!note.getUser().getId().equals(userId)) {
            throw new ApiErrorException("Unauthorized: Note does not belong to user");
        }

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ApiErrorException("Category not found with id: " + categoryId));

        if (!category.getUser().getId().equals(userId)) {
            throw new ApiErrorException("Unauthorized: Category does not belong to user");
        }

        if (note.getCategories() == null) {
            note.setCategories(new ArrayList<>());
        }

        if (note.getCategories().stream().anyMatch(c -> c.getId().equals(categoryId))) {
            throw new ApiErrorException("Category is already attached to this note");
        }
        note.getCategories().add(category);
        notesRepository.save(note);
    }

    public void removeCategory(Integer noteId, Integer categoryId, Integer userId) {
        Note note = notesRepository.findById(noteId)
                .orElseThrow(() -> new ApiErrorException("Note not found with id: " + noteId));

        if (!note.getUser().getId().equals(userId)) {
            throw new ApiErrorException("Unauthorized: Note does not belong to user");
        }
        
        boolean removed = note.getCategories().removeIf(c -> c.getId().equals(categoryId));

        if (!removed) {
            throw new ApiErrorException("Category is not attached to this note");
        }

        notesRepository.save(note);
    }
}
