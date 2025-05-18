import { useState } from "react";
import Swal from "sweetalert2";
import { saveComments as saveCommentsRequest } from "../../services";

export const useComment = () => {
    const [isLoading, setIsLoading] = useState(false);

    const saveComments = async (id, { text }) => {
        setIsLoading(true);

        try {
            await saveCommentsRequest (id, { text });

            await Swal.fire({
                icon: 'success',
                title: 'Comentario compartido',
                text: 'El comentario se ha compartido exitosamente!!',
                timer: 3000,
                showConfirmButton: false
            })
        } catch (error) {
            const backendError = error.response?.data;

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Ocurrio un error, Por favor, intenta de nuevo'
            })
        } finally {
            setIsLoading(false);
        }
    }

    return {
        saveComments,
        isLoading
    }
}