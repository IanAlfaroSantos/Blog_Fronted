import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPublicationById } from "../../services"
import Swal from "sweetalert2"
import { Input } from "../Input"
import { useUpdatePublication } from "../../shared/hooks"
import videoPublication from '../../assets/vid/FondoUpdateUser.mp4'
import '../../index.css'

export const UpdatePublication = ({ courses }) => {
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
    isLinkSelected: false
  })

  const { id } = useParams()
  const navigate = useNavigate()
  const { updatePublication, isLoading } = useUpdatePublication()

  useEffect(() => {
    const checkAuth = async () => {
      const user = localStorage.getItem("user")

      if (!user) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Para realizar esta acción necesita iniciar sesión",
        })
        navigate("/auth")
        return
      }
    }

    checkAuth()
  }, [navigate])

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const response = await getPublicationById(id)
        const publication = response.publication

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
          isLinkSelected: false
        })

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar la publicación",
        })

        navigate("/publications")
      }
    }

    fetchPublication()
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0]

    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, selecciona un archivo de imagen válido'
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormState((prevState) => ({
          ...prevState,
          image: {
            ...prevState.image,
            value: reader.result
          }
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePublicationUpdate = (event) => {
    event.preventDefault()

    if (!formState.title.isValid || !formState.content.isValid || !formState.course.isValid || !formState.image.isValid) {
      Swal.fire({
        icon: "warning",
        title: "Campos inválidos",
        text: "Por favor, asegúrate de completar todos los campos",
      })

      return
    }

    updatePublication(id, {
      title: formState.title.value,
      content: formState.content.value,
      nameCourse: formState.course.value,
      image: formState.image.value
    }).then(() => {
      navigate("/")
    })
  }

  const validCourses = Array.isArray(courses) ? courses : []

  return (
    <div className="register-container">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={videoPublication} type="video/mp4" />
        </video>
      </div>
      <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="user-image" alt="User Icon" />
      <form className="auth-form" onSubmit={handlePublicationUpdate}>
        <h2>Actualizar Publicación</h2>
        <br />
        <Input
          field='title'
          label='Título'
          value={formState.title.value}
          onChangeHandler={handleInputValueChange}
          type='text'
          onBlurHandler={(e) => { }}
          showErrorMessage={formState.title.showError}
          validationMessage={formState.title.validationMessage}
        />
        <br />
        <Input
          field='content'
          label='Contenido'
          value={formState.content.value}
          onChangeHandler={handleInputValueChange}
          type='text'
          onBlurHandler={(e) => { }}
          showErrorMessage={formState.content.showError}
          validationMessage={formState.content.validationMessage}
        />
        <br />
        <label htmlFor="course">Curso</label>
        <select
          id="course"
          value={formState.course.value}
          onChange={(e) => handleInputValueChange(e.target.value, 'course')}
        >
          <option value="">Selecciona un curso</option>
          {validCourses.length > 0 ? (
            validCourses.map((course) => (
              <option key={course._id} value={course.name}>
                {course.name}
              </option>
            ))
          ) : (
            <option disabled>No hay cursos disponibles</option>
          )}
        </select>
        <br />
        <div>
          <label>
            <input
              className="input-image"
              type="radio"
              name="imageSource"
              value="file"
              checked={!formState.isLinkSelected}
              onChange={() => setFormState((prevState) => ({ ...prevState, isLinkSelected: false }))}
            />
            Upload Image
          </label>
          <label>
            <input
              className="input-image1"
              type="radio"
              name="imageSource"
              value="link"
              checked={formState.isLinkSelected}
              onChange={() => setFormState((prevState) => ({ ...prevState, isLinkSelected: true }))}
            />
            Use Image URL
          </label>
        </div>
        {!formState.isLinkSelected ? (
          <>
            <input
              className="image-subida"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </>
        ) : (
          <Input
            field="image"
            label="Imagen URL"
            value={formState.image.value}
            onChangeHandler={handleInputValueChange}
            type="text"
            showErrorMessage={formState.image.showError}
            validationMessage={formState.image.validationMessage}
          />
        )}
        <br />
        <button type="submit" disabled={isLoading || !formState.title.isValid || !formState.content.isValid || !formState.course.isValid}>
          Actualizar
        </button>
      </form>
    </div>
  )
}