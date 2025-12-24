package com.ensolvers.juansoto.demo.services;

import com.ensolvers.juansoto.demo.entities.Note;
import com.ensolvers.juansoto.demo.entities.User;
import com.ensolvers.juansoto.demo.repository.NotesRepository;
import com.ensolvers.juansoto.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateNoteService {

    @Autowired
    private NotesRepository repository;

    @Autowired
    private UserRepository userRepository;

    public void createNote(String title, String content, Integer userId) {

        User userReference = userRepository.getReferenceById(userId);

        Note note = Note.builder()
                .title(title)
                .content(content)
                .isArchived(false)
                .user(userReference)
                .build();

        repository.save(note);
    }
}
