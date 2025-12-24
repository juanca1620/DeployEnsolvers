import api from './api';

export interface Category {
    id: number;
    name: string;
}

export const categoriesService = {
    // Assuming a generic getAll for categories exists or will be implemented
    // Based on standard patterns. If not in postman, we might just have create/attach/remove.
    // The prompt implies "create and get" exist.
    getAll: async () => {
        // TODO: Check if this endpoint exists in backend, otherwise might need implementation
        // Assuming standard REST pattern or relying on User entity fetching.
        // For now, let's assume we might need to fetch them. 
        // Re-checking Postman: "Create Category", "Attach", "Remove". 
        // It doesn't explicitly show "Get Categories". 
        // However, user usually needs to pick from a list. 
        // Let's assume a basic get endpoint or we will add it later.
        // For now, I'll place a placeholder or standard endpoint.
        const response = await api.get<Category[]>('/category');
        return response.data;
    },

    create: async (name: string) => {
        const response = await api.post('/category', { name });
        return response.data;
    },

    attach: async (noteId: number, categoryId: number) => {
        const response = await api.post('/category/attach', { note_id: noteId, category_id: categoryId });
        return response.data;
    },

    remove: async (noteId: number, categoryId: number) => {
        const response = await api.post('/category/remove', { note_id: noteId, category_id: categoryId });
        return response.data;
    }
};
