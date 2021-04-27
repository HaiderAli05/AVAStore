import React,{useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { showErrorMessage , showSuccessMessage } from '../helpers/message.js'; 
import { showLoading } from '../helpers/loading.js';
import { register } from '../api/user.js';
import {  
    getTokenInStorage,
    getUserRole
} from '../helpers/localStorage.js';

const Register = () => {
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        country: '',
        successMsg: false,
        errorMsg: false,
        loading: false
    });
    const {firstName,lastName,email,password,confirmPassword,phone,country,successMsg,errorMsg,loading} = formData;
    
    // Event Handlers
    const handleChange = (evt) =>{
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            errorMsg: '',
            successMsg: ''
        });
    };
    const handleSubmit = (evt) => {
        evt.preventDefault();
        // Client Side Validation
        if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password) || isEmpty(confirmPassword) || isEmpty(phone) || isEmpty(country)){
            setFormData({
                ...formData,
                errorMsg: 'All fields are required'
            })
        }else if(!isEmail(email)){
            setFormData({
                ...formData,
                errorMsg: 'Invalid Email'
            })
        }else if(!equals(password, confirmPassword)){
            setFormData({
                ...formData,
                errorMsg: 'Passwords must be same!'
            })
        }else{
            const {firstName,lastName,email,password,confirmPassword,phone,country} = formData;
            const data = {firstName,lastName,email,password,confirmPassword,phone,country};
            setFormData({...formData, loading:true});

            register(data)
                .then((response) =>{
                    console.log('Axios Registered Success', response);
                    setFormData({
                        ...formData,
                        loading: false,
                        successMsg: response.data.successMessage,
                    });
                    history.push('/api/user/login');
                })
                .catch((err) =>{
                    console.log('Axios Register error', err);
                    setFormData({
                        ...formData, 
                        loading: false, 
                        errorMsg: err.response.data.message });
                });

        }

    };
    return(
        <div className="bg-secondary rounded shadow text-white col-lg-8 col-md-10 p-5 m-auto">
            <form className="row g-3 lead" method="post" action="/api/user/register" onSubmit={handleSubmit}>
                <h2 className="register-title text-center display-6">Create an Account</h2>
                <div className="col-md-6">
                    <label for="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control bg-light text-secondary" id="firstName" name="firstName" value={firstName} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label for="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control bg-light text-secondary" id="lastName" name="lastName" value={lastName} onChange={handleChange} required />
                </div>
                <div className="col-md-12">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control bg-light text-secondary" id="email" name="email" value={email} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label for="password" className="form-label">Password</label>
                    <input type="password" className="form-control bg-light text-secondary" id="password" name="password" value={password} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label for="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control bg-light text-secondary" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label for="phone" className="form-label">Phone</label>
                    <input type="number" className="form-control bg-light text-secondary" id="phone" name="phone" value={phone} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                    <label for="country" className="form-label">Country</label>
                    <input type="text" className="form-control bg-light text-secondary" id="country" name="country" value={country} onChange={handleChange} required />
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-outline-light w-100 my-3">Register</button>
                </div>
                {errorMsg && showErrorMessage(errorMsg)}
                {successMsg && showSuccessMessage(successMsg)}
                <div className="text-center">{loading && showLoading(loading)}</div>
                <div className="col-md-12">
                    <p className="lead mt-3">Have an account? <Link to="/api/user/login" className="text-white-50">LogIn</Link></p>
                </div>
            </form>
        </div>
    )
};
export default Register;