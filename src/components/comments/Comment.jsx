import { useState } from "react";
import { FaComment } from 'react-icons/fa';
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
        <div className="comment-container">
            <form onSubmit={handleComment} className="comment-form">
                <div className="input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', backgroundColor: '#f1f1f1', borderRadius: '8px', padding: '10px', border: '1px solid #ddd', transition: 'all 0.3s ease' }}>
                    <FaComment className="input-icon" size={30} />
                    <input
                        type="text"
                        placeholder="Escribe tu comentario..."
                        value={formState.text.value}
                        onChange={(e) => handleInputValueChange(e.target.value, 'text')}
                        onBlur={(e) => handleInputValidationOnBlur(e.target.value, 'text')}
                        style={{
                            width: '100%',
                            paddingLeft: '35px',
                            paddingRight: '12px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            color: '#333',
                            backgroundColor: 'transparent',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                        }}
                    />
                </div>
                {formState.text.showError && <span className="error-message">{formState.text.validationMessage}</span>}
                <button type="submit" disabled={isLoading || !formState.text.isValid} className="comment-submit-btn">
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
                                <div className="comment-header">
                                    <strong className="comment-user">{comment.user?.username || "Anónimo"}</strong>
                                    <small className="comment-date">{comment.Date}</small>
                                </div>
                                <p className="comment-text">{comment.text}</p>

                                {comment.user?._id === JSON.parse(localStorage.getItem("user"))?.uid && (
                                    <div className="comment-actions">
                                        <button onClick={() => handleEdit(comment)} className="edit-btn">Editar</button>
                                        <button onClick={() => handleDelete(comment._id)} className="delete-btn">Eliminar</button>
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