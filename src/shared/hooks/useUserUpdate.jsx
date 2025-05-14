import { useState, useEffect } from "react";
import { getUserById, updateUser } from "../../services";
import Swal from "sweetalert2";

export const useUserSettings = () => {

    const [userSettings, setUserSettings] = useState();

    const fetchUserSettings = async () => {
        const response = await getUserById();

        if (response.error) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.e?.response?.data || 'Ocurrio un error al obtener la data del usuario'
            })
        }

        setUserSettings({
            name: response.data.name,
            surname: response.data.surname,
            username: response.data.username,
            email: response.data.email,
            phone: response.data.phone,
            currentPassword: '',
            password: ''
        })
    }

    const saveSettings = async (data) => {
        const confirm = await Swal.fire({
            icon: 'question',
            title: '¿Está seguro?',
            text: '¿Desea actualizar su información?',
            showCancelButton: true,
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar'
        })

        if (!confirm.isConfirmed) return;

        const payload = {
            name: data.name,
            surname: data.surname,
            username: data.username,
            phone: data.phone
        };

        if (data.password && data.currentPassword) {
            payload.password = data.password;
            payload.currentPassword = data.currentPassword;
        }

        const response = await updateUser(payload);

        if (response.error) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.e?.response?.data || 'Ocurrio un error al actualizar la informacion del usuario'
            })
        }

        await Swal.fire({
            icon: 'success',
            title: '¡Usuario Actualizado!',
            text: 'Tu información se actualizo exitosamente',
            timer: 3000,
            showConfirmButton: false
        });

        setUserSettings(response.updateUser);
    }

    useEffect(() => {
        fetchUserSettings();
    }, []);

    return ({
        isFetching: !userSettings,
        userSettings,
        setUserSettings,
        saveSettings
    })
}