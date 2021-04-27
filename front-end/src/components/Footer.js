import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-secondary text-light text-center text-lg-start">
            <div className="container p-5">
                <div className="row">
                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 className="text-uppercase display-6">AVA STORE</h5>
                    <p className="lead">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                    molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
                    voluptatem veniam, est atque cumque eum delectus sint!
                    </p>
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Menu</h5>
                    <ul className="list-unstyled mb-0">
                    <li>
                        <Link to="/" className="text-white-50 text-decoration-none d-inline-block my-1">Home</Link>
                    </li>
                    <li>
                        <Link to="/api/products" className="text-white-50 text-decoration-none d-inline-block my-1">Products</Link>
                    </li>
                    <li>
                        <Link to="/api/user/login" className="text-white-50 text-decoration-none d-inline-block my-1">LogIn</Link>
                    </li>
                    <li>
                        <Link to="/api/user/register" className="text-white-50 text-decoration-none d-inline-block my-1">Register</Link>
                    </li>
                    </ul>
                </div>
                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Contacts</h5>

                    <ul className="list-unstyled">
                    <li>
                        <Link to="/" className="text-white-50 text-decoration-none d-inline-block my-1">+00 000 000</Link>
                    </li>
                    <li>
                        <Link mailto="abc@xyz.com" to="/" className="text-white-50 text-decoration-none d-inline-block my-1">abc@xyz.com</Link>
                    </li>
                    <li>
                        <Link to="/" className="text-white-50 text-decoration-none d-inline-block my-1">Address of Ava Store.</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            <div className="text-center p-3 lead bg-dark">
                <p className="p-0 m-0">© Copyright 2021 AVA STORE</p>
            </div>
        </footer>
    )
}

export default Footer
