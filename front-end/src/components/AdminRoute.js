import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenInStorage, getUserRole } from '../helpers/localStorage.js';

const AdminRoute = ({component: Component, ...rest}) => {
    return (
       <Route 
            {...rest}
            render= {(props) => 
                getTokenInStorage() && getUserRole() === 1 ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/api/user/login' />
                )
            }
       />
    )
}

export default AdminRoute