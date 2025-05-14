export const validatePhone = (phone) => {
    if (!phone.trim()) {
        return {
            isValid: false,
            message: 'Phone is required'
        }
    }

    const regex = /^\S{8,8}$/;
    if (!regex.test(phone)) {
        return {
            isValid: false,
            message: 'El número de telefono debe contener exactamente 8 digitos y no debe contener espacios'
        }
    }

    return { isValid: true, message: '' };
}