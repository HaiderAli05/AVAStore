import axios from 'axios';
//Register a New User
export const register = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
        },
    };
    const response = await axios.post('/api/user/register', data, config);
    return response;
}
//Login User
export const login = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
        },
    };
    const response = await axios.post('/api/user/login', data, config);
    return response;
}