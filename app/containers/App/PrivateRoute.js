import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AuthPage from 'containers/AuthPage';
import globalScope from 'globalScope';

const PrivateRoute = ({ component: Component, render: propsRender, ...remainingProps }) => {
    const renderContent = (props) => {
        if (!globalScope.token) {
            return <AuthPage title="Login to Hermo" />;
        }

        if (propsRender) {
            return propsRender(props);
        }

        return <Component {...props}></Component>;
    };

    return (
        <Route
            // path=""
            render={renderContent}
            {...remainingProps}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.any,
};

export default PrivateRoute;
