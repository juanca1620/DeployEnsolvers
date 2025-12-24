package com.ensolvers.juansoto.demo.services;

import com.ensolvers.juansoto.demo.entities.Note;
import com.ensolvers.juansoto.demo.repository.NotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeleteNoteService {

    @Autowired
    private NotesRepository notesRepository;

    public void deleteNote(Integer noteId, Integer userId) {
        // Fetch the note by ID
        Note note = notesRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));

        // Security check: verify the note belongs to the user
        if (!note.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: Note does not belong to user");
        }

        // Delete the note
        notesRepository.delete(note);
    }
}
