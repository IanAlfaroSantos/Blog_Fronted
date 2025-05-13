export const logout = () => {

    localStorage.removeItem('user');

    localStorage.setItem('mostrar-mensaje', 'true');

    window.location.href = '/';
}