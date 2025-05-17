import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input";
import Swal from "sweetalert2";
import {
    validateTitle,
    validateContent,
    validateCourse,
    validateImageURL
} from "../../shared/validators";
import { usePublication } from "../../shared/hooks";
import { getPublications } from "../../services";
import videoPublication from '../../assets/vid/FondoUpdateUser.mp4';
import '../../index.css';

export const Publication = ({ courses }) => {

    const { publication, isLoading } = usePublication();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const user = localStorage.getItem("user");

            if (!user) {
                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Para realizar esta acción necesita iniciar sesión"
                });
                navigate("/auth");
                return;
            }

            try {
                await getPublications();
            } catch (error) {
                console.error("Error al obtener publicaciones:", error);
                const backendError = error.response?.data;
                const errorMessage = backendError?.error || backendError?.msg || "Error al cargar las publicaciones";

                await Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: errorMessage
                });

                navigate("/auth");
            }
        };

        checkAuth();
    }, [navigate]);

    const [formState, setFormState] = useState({
        title: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        content: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        course: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        image: {
            value: '',
            isValid: false,
            showError: false,
            validationMessage: ''
        },
        isLinkSelected: false
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            if (!file.type.startsWith('image/')) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Please select a valid image file'
                })
                return
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState((prevState) => ({
                    ...prevState,
                    image: {
                        ...prevState.image,
                        value: reader.result
                    }
                }))
            }
            reader.readAsDataURL(file);
        }
    }

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }));
    }

    const handleInputValidationOnBlur = (value, field) => {
        let result = { isValid: false, message: '' };
        switch (field) {
            case 'title':
                result = validateTitle(value);
                break;
            case 'content':
                result = validateContent(value);
                break;
            case 'course':
                result = validateCourse(value);
                break;
            case 'image':
                result = validateImageURL(value);
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

    const handlePublication = (event) => {
        event.preventDefault();
        publication({
            title: formState.title.value,
            content: formState.content.value,
            nameCourse: formState.course.value,
            image: formState.image.value
        });
    }

    const isSubmitButtonDisable = isLoading ||
        !formState.title.isValid ||
        !formState.content.isValid ||
        !formState.course.isValid;

    const validCourses = Array.isArray(courses.courses) ? courses.courses : [];

    return (
        <div className="register-container">
            <div className="video-background">
                <video autoPlay loop muted playsInline>
                    <source src={videoPublication} type="video/mp4" />
                </video>
            </div>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" className="user-image" alt="User Icon" />
            <form className="auth-form">
                <h2>Create Publication</h2>
                <br />
                <Input
                    field='title'
                    label='Title'
                    value={formState.title.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.title.showError}
                    validationMessage={formState.title.validationMessage}
                />
                <br />
                <Input
                    field='content'
                    label='Content'
                    value={formState.content.value}
                    onChangeHandler={handleInputValueChange}
                    type='text'
                    onBlurHandler={handleInputValidationOnBlur}
                    showErrorMessage={formState.content.showError}
                    validationMessage={formState.content.validationMessage}
                />
                <br />
                <label htmlFor="course">Course</label>
                <select
                    id="course"
                    value={formState.course.value}
                    onChange={(e) => handleInputValueChange(e.target.value, 'course')}
                    onBlur={() => handleInputValidationOnBlur(formState.course.value, 'course')}
                >
                    <option value="">Select a course</option>
                    {validCourses.length > 0 ? (
                        validCourses.map((course) => (
                            <option key={course._id} value={course.name}>
                                {course.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>No courses available</option>
                    )}
                </select>
                {formState.course.showError && (
                    <span className="error">{formState.course.validationMessage}</span>
                )}
                <br />
                <div>
                    <label>
                        <input
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
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </>
                ) : (
                    <Input
                        field="image"
                        label="Image URL"
                        value={formState.image.value}
                        onChangeHandler={handleInputValueChange}
                        type="text"
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.image.showError}
                        validationMessage={formState.image.validationMessage}
                    />
                )}
                <br />
                <button onClick={handlePublication} disabled={isSubmitButtonDisable}>
                    Share
                </button>
            </form>
        </div>
    )
}