import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePublication as savePulicationRequest } from "../../services";
import Swal from "sweetalert2"

export const usePublication = () => {

    const [ isLoading, setIsLoading ] = useState(false);

    const navigate = useNavigate();

    const publication = async ({title, content, nameCourse, image}) => {

        setIsLoading(true);

        try {
            await savePulicationRequest({ title, content, nameCourse, image });

            await Swal.fire({
                icon: "success",
                title: "Pulicación compartida",
                text: "Se compartio la publicación exitosamente!!",
                timer: 3000,
                showConfirmButton: false
            })

            navigate('/');

        } catch (error) {
            const backendError = error.response?.data;

            Swal.fire({
                icon: "error",
                title: "Error",
                text: backendError?.error || backendError?.msg || 'Ocurrio un error inesperado. Por favor, intenta de nuevo'
            })
        } finally {
            setIsLoading(false);
        }
    }

    return {
        publication,
        isLoading
    }
}