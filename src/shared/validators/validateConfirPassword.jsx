export const validateConfirPassword = (pass, confPass) => {
    if (!confPass) {
        return {
            isValid: false,
            message: 'Confirmation password is required'
        }
    }

    if (pass !== confPass) {
        return {
            isValid: false,
            message: 'Las contraseñas no coinciden'
        }
    }

    return { isValid: true, message: '' };
}