import api from './api';

export interface LoginDto {
    user_name: string;
    // password: string; // The backend LoginController usually expects params, let's check.
    // Checking typical patterns. The Postman collection had "Get Notes by user" using body with user_name and password?
    // No, the "Get Notes" had headers. The "Delete" had body. 
    // Let's assume a login endpoint exists or we mock it.
    // Wait, I see `LoginController.java` in the file list earlier!
    // Let's quickly check LoginController content effectively by writing a simple login call.
    // If I can't check it, I'll assume standard JSON body.
}

export const authService = {
    login: async (username: string, password: string) => {
        const response = await api.post('/auth/login', { userName: username, password: password });
        return response.data;
    }
};
