import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services";
import Swal from "sweetalert2";

export const useLogin = () => {
    const [ isLoading, setIsLoading ] = useState(false);

    const navigate = useNavigate();

    const login = async (usernameOrEmail, password) => {

        setIsLoading(true);

        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(usernameOrEmail);

        const response = await loginRequest({
            [isEmail ? "email" : "username"] : usernameOrEmail,
            password 
        });

        setIsLoading(false);

        if (response.error) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.error?.response?.data || 'Ocurrio un error al iniciar sesión, intenta de nuevo'
            });
        }

        const { userDetails } = response.data;

        localStorage.setItem('user', JSON.stringify(userDetails));

        await Swal.fire({
            icon: 'success',
            title: 'Inicio exitoso',
            text: 'Inicio de sesión exitosamente!!',
            timer: 3000,
            showConfirmButton: false
        });

        navigate('/');
    }

    return {
        login,
        isLoading
    }
}