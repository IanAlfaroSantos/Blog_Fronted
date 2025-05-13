export const validateUsername = (username) => {
    const regex = /^\S{3,15}$/;
    return regex.test(username);
}

export const validateUsernameMessage = 'El nombre de usuario debe contener entre 3 y 15 caracteres y no debe contener espacios';