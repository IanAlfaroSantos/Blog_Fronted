export const validatePassword = (value) => {
    if (!value.trim()) {
        return {
            isValid: false,
            message: 'Password is required'
        }
    }

    const regex = /^\S{8,8}$/;
    if (!regex.test(value)) {
        return {
            isValid: false,
            message: 'La contraseña debe contener exactamente 8 caracteres y no debe contener espacios'
        }
    }

    return { isValid: true, message: '' };
}