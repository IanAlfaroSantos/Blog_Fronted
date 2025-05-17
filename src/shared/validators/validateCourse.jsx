export const validateCourse = (course) => {
    if (!course.trim()) {
        return {
            isValid: false,
            message: "Course is required"
        }
    }

    return { isValid: true, message: '' }
}