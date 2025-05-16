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