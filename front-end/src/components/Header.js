import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {
    getTokenInStorage,
    getUserInStorage,
    getUserRole,
    handleSignout
} from '../helpers/localStorage.js';


const Header = ({history}) => {
    const logout = () => {
        handleSignout(() => {
            history.push('/login');
        });
    }
    const showNavigation = () => (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <h1 className="text-light">AVA STORE</h1>
                    {/* <img src={avaStoreLogo} alt="AVA Store Logo"/> */}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {!getTokenInStorage() && !getUserInStorage() && (
                        <Fragment>
                            <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/aboutus">About Us</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/login">LogIn</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </Fragment>
                    )}
                    
                    {getTokenInStorage() && getUserInStorage() && (
                        <Fragment>
                            <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/aboutus">About Us</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                            {getTokenInStorage() && getUserRole() === 1 && (
                                <Fragment>
                                    <li class="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">{getUserInStorage().firstName}</Link>
                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><Link className="dropdown-item text-secondary" to="/admin/dashboard">Profile</Link></li>
                                            <li><Link className="dropdown-item text-secondary" to="/orders">Orders</Link></li>
                                            <li><hr class="dropdown-divider"/></li>
                                            <li><button className="dropdown-item text-secondary" onClick={logout} >Logout</button></li>
                                        </ul>
                                    </li>
                                </Fragment>
                            )}
                            {getTokenInStorage() && getUserRole() === 0 && (
                                <Fragment>
                                    <li class="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">{getUserInStorage().firstName}</Link>
                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <li><Link className="dropdown-item text-secondary" to="/user/dashboard">Profile</Link></li>
                                            <li><Link className="dropdown-item text-secondary" to="/orders/:id">Orders</Link></li>
                                            <li><hr class="dropdown-divider"/></li>
                                            <li><button className="dropdown-item text-secondary" onClick={logout} >Logout</button></li>
                                        </ul>
                                    </li>
                                </Fragment>
                            )}
                        </Fragment>
                    )}
                </ul>
                </div>
            </div>
        </nav>
    );
    return <header id="header">{showNavigation()}</header>
}

export default withRouter(Header);