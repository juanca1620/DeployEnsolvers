import { useState, useEffect, useCallback } from 'react';
import { notesService, type NoteResponseDto } from '../services/notesService';
import { categoriesService } from '../services/categoriesService';

export const useNotes = (isAuthenticated: boolean) => {
    const [notes, setNotes] = useState<NoteResponseDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filterActive, setFilterActive] = useState<boolean | undefined>(undefined); // undefined = all, true = active, false = archived
    const [filterCategory, setFilterCategory] = useState<number | undefined>(undefined);

    const fetchNotes = useCallback(async () => {
        if (!isAuthenticated) return;
        setLoading(true);
        try {
            // Note: Backend 'active' param: true -> isArchived=false.
            // If filterActive is true (show active), pass true.
            // If filterActive is false (show archived), pass false.
            // If undefined, pass undefined.
            const data = await notesService.getAll(filterActive, filterCategory);
            setNotes(data);
            setError(null);
        } catch (err: any) {
            const backendMessage = err.response?.data?.message || err.response?.data?.mensage;
            setError(backendMessage || 'Failed to fetch notes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, filterActive, filterCategory]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const createNote = async (title: string, content: string) => {
        try {
            await notesService.create({ title, content });
            await fetchNotes(); // Refresh list
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const updateNote = async (id: number, title: string, content: string) => {
        try {
            await notesService.update(id, { title, content });
            await fetchNotes();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const deleteNote = async (id: number) => {
        try {
            await notesService.delete(id);
            await fetchNotes();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const toggleArchive = async (id: number, currentStatusIsArchived: boolean) => {
        try {
            // Backend expects 'active' status to set.
            // If currently archived (isArchived=true), we want to make it active (active=true).
            // If currently active (isArchived=false), we want to archive it (active=false).
            const newActiveState = currentStatusIsArchived;
            // Logic check: 
            // If isArchived=true, we pass active=true to UNarchive.
            // If isArchived=false, we pass active=false to Archive.
            // So passed 'active' value should be == current 'isArchived' value.

            await notesService.archive(id, newActiveState);
            await fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const attachCategory = async (noteId: number, categoryId: number) => {
        try {
            await categoriesService.attach(noteId, categoryId);
            await fetchNotes();
        } catch (err) {
            console.error(err);
        }
    }

    const removeCategory = async (noteId: number, categoryId: number) => {
        try {
            await categoriesService.remove(noteId, categoryId);
            await fetchNotes();
        } catch (err) {
            console.error(err);
        }
    }

    return {
        notes,
        loading,
        error,
        createNote,
        updateNote,
        deleteNote,
        toggleArchive,
        attachCategory,
        removeCategory,
        setFilterActive,
        setFilterCategory,
        filterCategory,
        refresh: fetchNotes
    };
};
