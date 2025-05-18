import { useState, useEffect } from "react";
import { getPublications, getCourses, deletePublication } from "../../services";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Comment } from "../comments/Comment.jsx";

export const PublicationList = () => {
    const [comentarioActivo, setComentarioActivo] = useState(null);
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getCourses();
                if (response && Array.isArray(response.courses)) {
                    setCourses(response.courses);
                } else {
                    console.error("No se pudieron cargar los cursos", response);
                }
            } catch (error) {
                console.error("Error al cargar los cursos", error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await getPublications();

                if (response && Array.isArray(response.publications)) {
                    const dataWithoutEstado = response.publications.map((publication) => {
                        const { estado, ...publicationData } = publication;
                        return publicationData;
                    });

                    if (selectedCourse) {
                        setPublications(dataWithoutEstado.filter((pub) => pub.course.name.toLowerCase() === selectedCourse.toLowerCase()));
                    } else {
                        setPublications(dataWithoutEstado);
                    }
                } else {
                    console.error("El campo 'publications' no es un array", response);
                }
            } catch (error) {
                console.error("Error al cargar las publicaciones", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, [selectedCourse]);

    const handleClearFilters = () => {
        setSelectedCourse("");
    };

    const handleDeletePublication = async (id) => {
        try {
            const confirm = await Swal.fire({
                icon: 'question',
                title: '¿Está seguro?',
                text: '¿Desea eliminar su publicación?',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (!confirm.isConfirmed) return;

            const response = await deletePublication(id, { estado: false });

            if (response && response.success) {
                setPublications((prevPublications) =>
                    prevPublications.map((pub) =>
                        pub._id === id ? { ...pub, estado: false } : pub
                    )
                )

                const backendError = response?.error || response?.msg;
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: backendError || "Ocurrió un error inesperado. Por favor, intenta de nuevo"
                });

            } else {
                await Swal.fire({
                    icon: "success",
                    title: "Publicación eliminada",
                    text: "Se eliminó la publicación exitosamente!!",
                    timer: 3000,
                    showConfirmButton: false
                });
                window.location.reload();
            }
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                icon: "error",
                title: "Error",
                text: backendError?.error || backendError?.msg || 'Ocurrió un error inesperado. Por favor, intenta de nuevo'
            });
        }
    };

    const handleMostrarComentario = (idPublicacion) => {
        setComentarioActivo(idPublicacion === comentarioActivo ? null : idPublicacion);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="publications-feed">
            <div className="filter-section">
                <h2>Filtrar por Curso</h2>
                <select
                    className="course-select"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                >
                    <option value="">Seleccionar Curso</option>
                    {courses.map((course) => (
                        <option key={course._id} value={course.name.toLowerCase()}>
                            {course.name}
                        </option>
                    ))}
                </select>
                <button className="clear-filters" onClick={handleClearFilters}>
                    Limpiar Filtros
                </button>
            </div>

            {publications.length === 0 ? (
                <p>No hay publicaciones para este curso</p>
            ) : (
                publications.map((publication) => (
                    <div key={publication._id} className="publication-card">
                        <div className="publication-header">
                            <div className="user-avatar">
                                <img
                                    src="https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
                                    alt="User Avatar"
                                />
                            </div>
                            <div className="publication-title">
                                <h3>{publication.title}</h3>
                                <p>{publication.content}</p>
                            </div>
                        </div>

                        <div className="publication-user-info">
                            <span className="user-name">User: <strong>{publication.user.username}</strong></span>
                            <span className="publication-date">{publication.DateAndTime}</span>
                        </div>

                        {publication.course && (
                            <div className="publication-course">
                                <strong>Curso: </strong>{publication.course.name}
                            </div>
                        )}

                        {publication.image && (
                            <div className="publication-image">
                                <img className="responsive-image" src={publication.image} alt={publication.title} />
                            </div>
                        )}

                        <div className="publication-footer">
                            <div className="likes-comments">
                                <span>{publication.comment?.length || 0} Comments</span>
                            </div>
                            <div className="actions">
                                <button onClick={() => handleMostrarComentario(publication._id)}>Comment</button>
                                <Link to={`/update-publication/${publication._id}`}>
                                    <button>Update</button>
                                </Link>
                                {publication.estado !== false && (
                                    <button onClick={() => handleDeletePublication(publication._id)}>
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>

                        {comentarioActivo === publication._id && (
                            <div className="comment-section">
                                <Comment publicationId={publication._id} />
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}