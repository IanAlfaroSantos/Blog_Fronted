export const validateSurname = (surname) => {
    if (!surname.trim()) {
        return {
            isValid: false,
            message: 'Surname is required'
        }
    }

    const regex = /^\S{3,25}$/;
    if (!regex.test(surname)) {
        return {
            isValid: false,
            message: 'El apellido debe contener entre 3 y 25 caracteres y no debe contener espacios'
        }
    }

    return { isValid: true, message: '' };
}