export const validateEmail = (email) => {
    if (!email.trim()) {
        return {
            isValid: false,
            message: 'Email is required'
        }
    }

    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
        return {
            isValid: false,
            message: 'Por favor ingresa una dirección de correo válido'
        }
    }

    return { isValid: true, message: '' };
}