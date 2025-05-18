import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/blog/v1',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails) {
            const token = JSON.parse(useUserDetails).token;
            config.headers['x-token'] = token;
        }

        return config;
    },
    (e) => {
        return Promise.reject(e);
    }
)

export const login = async (data) => {
    return await apiClient.post('users/login', data);
}

export const register = async (data) => {
    return await apiClient.post('users/register', data);
}

export const getUserById = async () => {
    const response = await apiClient.get('users/search');
    return response.data;
}

export const updateUser = async (data) => {
    return await apiClient.put('users/', data);
}

export const savePublication = async (data) => {
    return await apiClient.post('publications/', data)
}

export const getPublications = async () => {
    const response = await apiClient.get('publications/');
    return response.data;
}

export const getCourses = async () => {
    const response = await apiClient.get('courses/');
    return response.data;
}

export const getPublicationById = async (id) => {
    const response = await apiClient.get(`publications/${id}`);
    return response.data;
}

export const updatePublication = async (id, data) => {
    return await apiClient.put(`publications/${id}`, data);
}

export const deletePublication = async (id, data) => {
    return await apiClient.delete(`publications/${id}`, data);
}

export const getPublicationByCourse = async (courseName) => {
    const response = await apiClient.get(`publications/course/${courseName}`);
    return response.data;
}

export const saveComments = async (id, data) => {
    return await apiClient.post(`comments/${id}`, data);
}

export const getComments = async () => {
    const response = await apiClient.get(`comments/`);
    return response.data;
}

export const updateComment = async (id, data) => {
    return await apiClient.put(`comments/${id}`, data);
}

export const deleteComment = async (id) => {
    return await apiClient.delete(`comments/${id}`);
}