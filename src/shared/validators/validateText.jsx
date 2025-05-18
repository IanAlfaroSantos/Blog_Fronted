export const validateText = (text) => {
    if (!text.trim()) {
        return {
            isValid: false,
            message: "Text is required"
        }
    }

    if (text.length < 1 || text.length > 200) {
        return {
            isValid: false,
            message: "El texto debe tener más de 1 caracter y menos de 200 caracteres"
        }
    }

    return { isValid: true, message: '' }
}