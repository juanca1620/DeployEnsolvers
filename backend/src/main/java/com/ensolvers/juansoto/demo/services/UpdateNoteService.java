package com.ensolvers.juansoto.demo.services;

import com.ensolvers.juansoto.demo.entities.Note;
import com.ensolvers.juansoto.demo.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateNoteService {

    @Autowired
    private NotesRepository notesRepository;

    public Note updateNote(Integer id, String title, String content, Integer userId) {
        // Fetch the note by ID
        Note note = notesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));

        // Security check: verify the note belongs to the user
        if (!note.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: Note does not belong to user");
        }

        // Update the note fields
        note.setTitle(title);
        note.setContent(content);

        // Save and return the updated note
        return notesRepository.save(note);
    }
}
