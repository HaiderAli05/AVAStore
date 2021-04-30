import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getTokenInStorage, getUserRole } from '../helpers/localStorage.js';

const UserRoute = ({component: Component, ...rest}) => {
    return (
       <Route 
            {...rest}
            render= {(props) => 
                getTokenInStorage() && getUserRole() === 0 ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }
       />
    )
}

export default UserRoute