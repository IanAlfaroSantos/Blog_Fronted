import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../../services";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const useUserSettings = () => {
    const [userSettings, setUserSettings] = useState({
        name: '',
        surname: '',
        username: '',
        email: '',
        phone: '',
        currentPassword: '',
        password: ''
    });
    const [isFetching, setIsFetching] = useState(true);
    const navigate = useNavigate();

    const fetchUserSettings = async () => {
        setIsFetching(true);
        try {
            const response = await getUserById();

            if (response.error) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.error || 'Ocurrió un error al obtener la data del usuario'
                });
            }

            setUserSettings({
                name: response.user.name,
                surname: response.user.surname,
                username: response.user.username,
                email: response.user.email,
                phone: response.user.phone,
                currentPassword: '',
                password: ''
            });
        } catch (error) {
            const backendError = error.response?.data;

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Hubo un error al intentar obtener la información del usuario'
            });
        } finally {
            setIsFetching(false);
        }
    };

    const saveSettings = async (user) => {
        const confirm = await Swal.fire({
            icon: 'question',
            title: '¿Está seguro?',
            text: '¿Desea actualizar su información?',
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar'
        });

        if (!confirm.isConfirmed) return;

        const payload = {
            name: user.name,
            surname: user.surname,
            username: user.username,
            phone: user.phone
        };

        if (user.password && user.currentPassword) {
            payload.password = user.password;
            payload.currentPassword = user.currentPassword;
        }

        try {
            const response = await updateUser(payload);

            if (response.error) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.error || 'Ocurrió un error al actualizar la información del usuario'
                });
            }

            await Swal.fire({
                icon: 'success',
                title: '¡Usuario Actualizado!',
                text: 'Tu información se actualizó exitosamente',
                timer: 3000,
                showConfirmButton: false
            });

            navigate('/');
        } catch (error) {
            const backendError = error.response?.data;

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Hubo un problema al guardar la información del usuario'
            });
        }
    };

    useEffect(() => {
        fetchUserSettings();
    }, []);

    return {
        isFetching,
        userSettings,
        setUserSettings,
        saveSettings
    };
}