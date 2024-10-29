// services/userService.js
export const getUsers = async () => {
    try {
        const response = await fetch('../../server/db.json');
        const data = await response.json();
        return data.user;
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        return [];
        // cambio
    }
};

