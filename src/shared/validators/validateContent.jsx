export const validateContent = (content) => {
    if (!content.trim()) {
        return {
            isValid: false,
            message: "Content is required"
        }
    }

    if (content.length < 5 || content.length > 250) {
        return {
            isValid: false,
            message: "El contenido debe tener más de 5 caracteres y menos de 250 caracteres"
        }
    }

    return { isValid: true, message: '' }
}