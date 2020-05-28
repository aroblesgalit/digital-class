import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import isAuthenticated from "../../config/middleware/isAuthenticated";

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            { ...rest }
            render={props => (
                !isAuthenticated ?
                    <Component { ...props } />
                : <Redirect to="/" />
            )}
        />
    );
}

export default PublicRoute;