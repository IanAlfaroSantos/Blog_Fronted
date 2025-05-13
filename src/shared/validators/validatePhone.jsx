export const validatePhone = (phone) => {
    const regex = /^\S{8,8}$/;
    return regex.test(phone);
}

export const validatePhoneMessage = 'El número de telefono debe contener exactamente 8 digitos y no debe contener espacios';