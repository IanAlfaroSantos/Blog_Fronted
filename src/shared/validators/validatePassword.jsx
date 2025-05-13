export const validatePassword = (password) => {
    const regex = /^\S{8,8}$/;
    return regex.test(password);
}

export const validatePasswordMessage = 'La contraseña debe contener exactamente 8 caracteres y no debe contener espacios';