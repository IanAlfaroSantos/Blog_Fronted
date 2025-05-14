export const validateName = (name) => {
    if (!name.trim()) {
        return {
            isValid: false,
            message: "Name is required"
        }
    }

    const regex = /^\S{3,25}$/;
    if (!regex.test(name)) {
        return {
            isValid: false,
            message: 'El nombre debe contener entre 3 y 25 caracteres y no debe contener espacios'
        }
    }

    return { isValid: true, message: '' };
}