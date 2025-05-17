import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPublicationById } from "../../services";
import Swal from "sweetalert2";
import { Input } from "../Input";
import { useUpdatePublication } from "../../shared/hooks";

export const UpdatePublication = () => {
  const [formState, setFormState] = useState({
    title: {
      value: "", isValid: false
    },
    content: {
      value: "", isValid: false
    },
    course: {
      value: "", isValid: false
    },
    image: {
      value: "", isValid: false
    },
  })

  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePublication, isLoading } = useUpdatePublication();

  useEffect(() => {

    const checkAuth = async () => {

      const user = localStorage.getItem("user");

      if (!user) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Para realizar esta acción necesita iniciar sesión",
        });
        navigate("/auth");
        return;
      }
    }

    checkAuth();
  }, [navigate])

  useEffect(() => {
    const fetchPublication = async () => {
      try {

        const response = await getPublicationById(id);
        const publication = response.publication;

        setFormState({
          title: {
            value: publication.title, isValid: true
          },
          content: {
            value: publication.content, isValid: true
          },
          course: {
            value: publication.course.name, isValid: true
          },
          image: {
            value: publication.image, isValid: true
          },
        })

      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la publicación",
        })

        navigate("/publications");
      }
    }

    fetchPublication();
  }, [id, navigate])

  const handleInputValueChange = (value, field) => {

    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value
      }
    }))
  }

  const handlePublicationUpdate = (event) => {
    event.preventDefault();

    if (!formState.title.isValid || !formState.content.isValid || !formState.course.isValid || !formState.image.isValid) {
      Swal.fire({
        icon: "warning",
        title: "Campos inválidos",
        text: "Por favor, asegúrate de completar todos los campos",
      })

      return;
    }

    updatePublication(id, {

      title: formState.title.value,
      content: formState.content.value,
      nameCourse: formState.course.value,
      image: formState.image.value

    }).then(() => {

      navigate("/");
    })
  }

  return (

    <div>
      <h2>Actualizar Publicación</h2>
      <form onSubmit={handlePublicationUpdate}>
        <Input
          field="title" b
          label="Título"
          value={formState.title.value}
          onChangeHandler={handleInputValueChange}
        />
        <Input
          field="content"
          label="Contenido"
          value={formState.content.value}
          onChangeHandler={handleInputValueChange}
        />
        <Input
          field="course"
          label="Curso"
          value={formState.course.value}
          onChangeHandler={handleInputValueChange}
        />
        <Input
          field="image"
          label="Imagen"
          value={formState.image.value}
          onChangeHandler={handleInputValueChange}
        />
        <button type="submit" disabled={isLoading}>Actualizar</button>
      </form>
    </div>
  )
}