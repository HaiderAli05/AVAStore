import axios from 'axios';
//Get All Products
export const allProducts = async () => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json', 
    //     },
    // };
    const response = await axios.get('/api/products');
    return response;
}
//Get Single Product
export const singleProduct = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
        },
    };
    const response = await axios.get('/api/products/:id', data, config);
    return response;
}
//Add a New Product
export const addProduct = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
        },
    };
    const response = await axios.post('/api/products/addproduct', data, config);
    return response;
}
//Update any Product
export const updateProduct = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'application/json', 
        },
    };
    const response = await axios.put('/api/products/:id', data, config);
    return response;
}