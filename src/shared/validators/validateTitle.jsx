export const validateTitle = (title) => {
    if (!title.trim()) {
        return {
            isValid: false,
            message: "Title is required"
        }
    }

    if (title.length < 5 || title.length > 40) {
        return {
            isValid: false,
            message: "El titulo debe tener más de 5 caracteres y menos de 40 caracteres"
        }
    }

    return { isValid: true, message: '' }
}