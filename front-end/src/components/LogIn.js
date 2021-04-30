import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { showErrorMessage } from '../helpers/message.js'; 
import { showLoading } from '../helpers/loading.js';
import { login } from '../api/user.js';
import { 
    setTokenInStorage, 
    getTokenInStorage,
    removeTokenInStorage,
    setUserInStorage,
    removeUserInStorage,
    getUserRole
} from '../helpers/localStorage.js';

const LogIn = () => {
    let history = useHistory();
    useEffect(()=>{
        // Check if user is Admin or a customer for specific Dashboards
        if(getTokenInStorage() && getUserRole() === 1){
            history.push('/admin/dashboard');
        }else if(getTokenInStorage() && getUserRole() === 0){
            history.push('/user/dashboard');
        }
    }, [history])

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errorMsg: false,
        loading: false
    });
    const {email,password,errorMsg,loading} = formData;
    // Event Handlers
    const handleChange = (evt) =>{
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            errorMsg: ''
        });
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // Client Side Validation
        if(isEmpty(email) || isEmpty(password)){
            setFormData({
                ...formData,
                errorMsg: 'All fields are required'
            })
        }else if(!isEmail(email)){
            setFormData({
                ...formData,
                errorMsg: 'Invalid Email'
            })
        }else{
            const {email,password} = formData;
            const data = {email,password};
            setFormData({...formData, loading:true});

            login(data)
                .then(response => {
                    setTokenInStorage(response.data.data.token);
                    setUserInStorage(response.data.data.user);

                    setFormData({ ...formData, isLoading: false });
                    if(getTokenInStorage() && getUserRole() === 1){
                        history.push('/products');
                    }else if(getTokenInStorage() && getUserRole() === 0){
                        history.push('/products');
                    }
                })
                .catch(err => {
                    removeTokenInStorage();
                    removeUserInStorage();

                    setFormData({ ...formData, isLoading: false, errorMsg: err.response.data.message });
                    console.log(err);
                });
        }
    };
    
    return(
        <section className="container py-custom">
            <div className="bg-secondary rounded shadow text-white col-md-6 p-5 m-auto">
                <form className="row g-3 lead login-form" method="post" action="/api/user/login"  onSubmit={handleSubmit}>
                    <h2 className="register-title text-center display-6">Log In</h2>
                    <div className="col-12">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control bg-light text-secondary" id="email" name="email" value={email} onChange={handleChange} required />
                    </div>
                    <div className="col-12">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control bg-light text-secondary" id="password" name="password" value={password} onChange={handleChange} required />
                    </div>
                    <div className="col-md-12 d-flex justify-content-center">
                        <button type="submit" className="btn btn-lg btn-outline-light w-100 mt-3">LogIn</button>
                    </div>
                    {errorMsg && showErrorMessage(errorMsg)}
                    <div className="text-center">{loading && showLoading(loading)}</div>
                    <div className="col-md-12">
                        <p className="lead">Don't have account? <Link to="/register" className="text-white-50">Register</Link></p>
                    </div>
                </form>
            </div>
        </section>
        
    )
};

export default LogIn;
