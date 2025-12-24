package com.ensolvers.juansoto.demo.services;

import com.ensolvers.juansoto.demo.dto.NoteResponseDto;
import com.ensolvers.juansoto.demo.dto.CategoryResponseDto;
import com.ensolvers.juansoto.demo.entities.Note;
import com.ensolvers.juansoto.demo.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetNotesService {

    @Autowired
    private NotesRepository notesRepository;

    public List<NoteResponseDto> getNotes(Integer userId, Integer categoryId, Boolean active) {

        Boolean isArchived = active != null ? !active : null;

        List<Note> notes;
        if (categoryId != null && isArchived != null) {
            notes = notesRepository.findByUserIdAndCategoriesIdAndIsArchived(userId, categoryId, isArchived);
        } else if (categoryId != null) {
            notes = notesRepository.findByUserIdAndCategoriesId(userId, categoryId);
        } else if (isArchived != null) {
            notes = notesRepository.findByUserIdAndIsArchived(userId, isArchived);
        } else {
            notes = notesRepository.findByUserId(userId);
        }

        // Convert entities to DTOs
        return notes.stream()
                .map(note -> NoteResponseDto.builder()
                        .id(note.getId())
                        .title(note.getTitle())
                        .content(note.getContent())
                        .isArchived(note.getIsArchived())
                        .categories(note.getCategories().stream()
                                .map(cat -> CategoryResponseDto.builder()
                                        .id(cat.getId())
                                        .name(cat.getName())
                                        .build())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }
}
