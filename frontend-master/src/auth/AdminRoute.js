import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './index';

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuthenticated() && isAuthenticated().dataUser.tipo === 0 ? (
        <Component {...props} />
    ) : (
        <Redirect
            to={{
                pathname: '/singin',
                state: {
                    from: props.location
                }
            }}
        />
    )} />
);

export default AdminRoute;