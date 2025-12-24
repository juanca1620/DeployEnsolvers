package com.ensolvers.juansoto.demo.repository;

import com.ensolvers.juansoto.demo.entities.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotesRepository extends JpaRepository<Note, Integer> {

    List<Note> findByUserId(Integer userId);

    List<Note> findByUserIdAndIsArchived(Integer userId, Boolean isArchived);

    List<Note> findByUserIdAndCategoriesIdAndIsArchived(Integer userId, Integer categoryId, Boolean isArchived);

    List<Note> findByUserIdAndCategoriesId(Integer userId, Integer categoryId);
}
