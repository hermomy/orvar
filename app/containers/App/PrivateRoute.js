import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import LoginForm from 'containers/LoginForm';

const PrivateRoute = ({ component: Component, render: propsRender, token, ...remainingProps }) => {
    const renderContent = (props) => {
        if (!token) {
            return <LoginForm />;
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
    token: PropTypes.string.isRequired,
};

export default PrivateRoute;
