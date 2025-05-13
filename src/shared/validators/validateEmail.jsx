export const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

export const validateEmailMessage = 'Por favor ingresa una dirección de correo válido';