export const validateUsernameOrEmail = (value) => {
    if (!value.trim()) {
        return {
            isValid: false,
            message: 'Username or email is required'
        }
    }

    const isEmail = /\S+@\S+\.\S+/.test(value);
    const isUsername = /^\S{3,15}$/.test(value);

    if (!isEmail && !isUsername) {
        return {
            isValid: false,
            message: 'Ingresa un correo válido o un nombre de usuario 3 a 15 caracteres sin espacios'
        }
    }

    return { isValid: true, message: '' };
}