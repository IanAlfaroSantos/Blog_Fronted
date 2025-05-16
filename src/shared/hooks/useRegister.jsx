import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services";
import Swal from "sweetalert2";

export const useRegister = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const register = async (name, surname, username, email, phone, password) => {

        setIsLoading(true);

        try {
            await registerRequest({ name, surname, username, email, phone, password });

            await Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Usuario registrado exitosamente!!',
                timer: 3000,
                showConfirmButton: false
            });

            navigate('/');

        } catch (error) {
            const backendError = error.response?.data;

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Ocurrió un error inesperado. Por favor, intenta de nuevo',
            });
        } finally {
            setIsLoading(false);
        }
    }

    return {
        register,
        isLoading
    }
}