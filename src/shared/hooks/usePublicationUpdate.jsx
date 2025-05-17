import { useState } from "react";
import Swal from "sweetalert2";
import { updatePublication as updatePublicationRequest } from "../../services";

export const useUpdatePublication = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updatePublication = async (id, { title, content, nameCourse, image }) => {
    setIsLoading(true);

    try {
      await updatePublicationRequest(id, { title, content, nameCourse, image });

      await Swal.fire({
        icon: "success",
        title: "Publicación Actualizada",
        text: "La publicación se actualizó exitosamente!",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      const backendError = error.response?.data;
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          backendError?.error || backendError?.msg || "Ocurrió un error inesperado. Por favor, intenta de nuevo",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    updatePublication,
    isLoading,
  }
}