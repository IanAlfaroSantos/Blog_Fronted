export const validateImageURL = (url) => {
    const regex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))$/i;

    if (url === '') {
        return { isValid: false, message: 'Image URL is required' };
    }

    if (!regex.test(url)) {
        return { isValid: false, message: 'Please enter a valid image URL (e.g., jpg, png, gif, bmp)' };
    }

    return { isValid: true, message: '' };
}