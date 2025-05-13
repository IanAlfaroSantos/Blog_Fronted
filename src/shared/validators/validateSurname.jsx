export const validateSurname = (surname) => {
    const regex = /^\S{3,25}$/;
    return regex.test(surname);
}

export const validateSurnameMessage = 'El apellido debe contener entre 3 y 25 caracteres y no debe contener espacios';