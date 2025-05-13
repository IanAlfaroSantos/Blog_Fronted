import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services";
import Swal from "sweetalert2";

export const useRegister = () => {

    const [ isLoading, setIsLoading ] = useState(false);

    const navigate = useNavigate();

    const register = async (name, surname, username, email, phone, password) => {

        setIsLoading(true);

        const response = await registerRequest({ name, surname, username, email, phone, password });

        setIsLoading(false);

        if (response.error) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.error?.response?.data || 'Ocurrio un error al registrar, intenta de nuevo'
            });
        }

        const { userDetails } = response.data;

        localStorage.setItem('user', JSON.stringify(userDetails));

        await Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Usuario registrado exitosamente!!',
            timer: 2000,
            showConfirmButton: false
        });

        navigate('/');
    }

    return {
        register,
        isLoading
    }
}