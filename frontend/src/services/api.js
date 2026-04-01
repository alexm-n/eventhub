import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (username, password) =>
    axios.post(`${API_URL}/token/`, { username, password });

export const getEvents = () => api.get('/events/');
export const createEvent = (data) => api.post('/events/', data);
export const updateEvent = (id, data) => api.put(`/events/${id}/`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}/`);

export const getParticipants = () => api.get('/participants/');
export const createParticipant = (data) => api.post('/participants/', data);

export const getRegistrations = () => api.get('/registrations/');
export const createRegistration = (data) => api.post('/registrations/', data);

export default api;