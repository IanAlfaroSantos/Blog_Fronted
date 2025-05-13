export const validateConfirPassword = (pass, confPass) => {
    return pass === confPass;
}

export const validateConfirPasswordMessage = 'Las contraseñas no coinciden';