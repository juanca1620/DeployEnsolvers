import api from './api';

export interface Note {
    id: number;
    title: string;
    content: string;
    isArchived: boolean;
}

export interface NoteResponseDto {
    id: number;
    title: string;
    content: string;
    isArchived: boolean;
    categories: { id: number; name: string }[];
}

export interface CreateNoteDto {
    title: string;
    content: string;
}

export const notesService = {
    getAll: async (active?: boolean, categoryId?: number) => {
        const params: any = {};
        if (active !== undefined) params.active = active;
        if (categoryId !== undefined) params.category = categoryId;

        // We expect NoteResponseDto[] from the backend now
        const response = await api.get<NoteResponseDto[]>('/notes', { params });
        return response.data;
    },

    create: async (data: CreateNoteDto) => {
        // The backend expects userId in header (handled by interceptor) 
        // and note creation DTO in body
        const response = await api.post('/notes', data);
        return response.data;
    },

    update: async (id: number, data: CreateNoteDto) => {
        const response = await api.put('/notes', { id, ...data });
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/notes/${id}`);
        return response.data;
    },

    archive: async (id: number, active: boolean) => {
        // Backend expects { note_id: number, active: boolean }
        const response = await api.post('/notes/changueStatus', { note_id: id, active });
        return response.data;
    }
};
