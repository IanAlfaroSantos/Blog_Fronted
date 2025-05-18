import { useState } from "react";
import { Input } from "../Input";
import {
    validateText
} from '../../shared/validators';
import { useComment } from "../../shared/hooks";
import { useCommentsByPublication } from "../../shared/hooks";
import { updateComment, deleteComment } from "../../services";
import Swal from "sweetalert2";

export const Comment = ({ publicationId }) => {
    const { saveComments, isLoading } = useComment();
    const { comments, isLoading: loadingComments } = useCommentsByPublication(publicationId);
    const [editingComment, setEditingComment] = useState(null);

    const [formState, setFormState] = useState({
        text: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        }
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let result = { isValid: false, message: '' };
        switch (field) {
            case 'text':
                result = validateText(value);
                break;
            default:
                break;
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid: result.isValid,
                showError: !result.isValid,
                validationMessage: result.message
            }
        }));
    }

    const handleComment = async (event, id) => {
        event.preventDefault();

        try {
            if (editingComment) {
                const confirm = await Swal.fire({
                    icon: 'question',
                    title: '¿Está seguro?',
                    text: '¿Desea actualizar su comentario?',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, actualizar',
                    cancelButtonText: 'Cancelar'
                });

                if (!confirm.isConfirmed) return;

                await updateComment(editingComment._id, {
                    text: formState.text.value
                })

                await Swal.fire({
                    icon: 'success',
                    title: 'Comentario actualizado',
                    text: 'El comentario se actualizó correctamente!',
                    timer: 3000,
                    showConfirmButton: false
                })
            } else {
                await saveComments(publicationId, { text: formState.text.value });
            }

            setFormState({
                text: {
                    value: '',
                    isValid: false,
                    showError: false,
                    validationMessage: ''
                }
            });
            setEditingComment(null);
            window.location.reload();

        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Ocurrió un error al actualizar el comentario'
            })
        }
    }

    const handleEdit = (comment) => {
        setFormState({
            text: {
                value: comment.text,
                isValid: true,
                showError: false,
                validationMessage: ''
            }
        })
        setEditingComment(comment);
    }

    const handleDelete = async (id) => {
        try {
            const confirm = await Swal.fire({
                icon: 'question',
                title: '¿Está seguro?',
                text: '¿Desea eliminar su comentario?',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (!confirm.isConfirmed) return;

            await deleteComment(id);

            await Swal.fire({
                icon: 'success',
                title: 'Comentario eliminado',
                text: 'El comentario se eliminó correctamente!',
                timer: 3000,
                showConfirmButton: false
            })

            window.location.reload();
        } catch (error) {
            const backendError = error.response?.data;
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: backendError?.error || backendError?.msg || 'Ocurrió un error al eliminar el comentario'
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleComment} className="comment-form">
                <Input
                    field='text'
                    type="text"
                    label="Comentario"
                    placeholder="Escribe tu comentario..."
                    value={formState.text.value}
                    onChangeHandler={handleInputValueChange}
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.text.showError}
                    validationMessage={formState.text.validationMessage}
                />

                <button type="submit" disabled={isLoading || !formState.text.isValid}>
                    {isLoading ? "Enviando..." : "Comentar"}
                </button>
            </form>

            <div className="comments-list">
                {loadingComments ? (
                    <p>Cargando comentarios...</p>
                ) : (
                    comments.length === 0 ? (
                        <p>No hay comentarios aún</p>
                    ) : (
                        comments.map((comment) => (
                            <div key={comment._id} className="comment-item">
                                <small>{(comment.Date)}</small>
                                <p><strong>{comment.user?.username || "Anónimo"}:</strong> {comment.text}</p>

                                {comment.user?._id === JSON.parse(localStorage.getItem("user"))?.uid && (
                                    <div>
                                        <button onClick={() => handleEdit(comment)}>Editar</button>
                                        <button onClick={() => handleDelete(comment._id)}>Eliminar</button>
                                    </div>
                                )}
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    )
}