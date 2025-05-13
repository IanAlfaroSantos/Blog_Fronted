import { validateEmail } from "./validateEmail";
import { validateUsername } from "./validateUsername";

export const validateUsernameOrEmail = (value) => {
    return validateEmail(value) || validateUsername(value);
}

export const validateUsernameOrEmailMessage = 'Ingresa un correo válido o un nombre de usuario 3 a 15 caracteres sin espacios';