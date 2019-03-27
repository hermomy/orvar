/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Input from 'components/Input';
// import Loading from 'components/Loading';
import ErrorMessage from 'components/ErrorMessage';

import reducer from './reducer';
import saga from './saga';
import { doLogin } from './actions';
import {
    makeSelectAuthError,
    makeSelectAuthLoading,
    makeSelectAuthLoginSuccess,
} from './selectors';
import './style.scss';

export const authkeys = ['username', 'password'];

export const Form = (props) => (
    <form className="login-form" onSubmit={props.action}>
        {
            props.keys.map((key) => (
                <Input key={key} type={key} placeholder={key} name={key} />
            ))
        }
        {props.error &&
            <ErrorMessage error={props.error} type="danger" />
        }
        <Input type="submit" className="hershop-button" value="Login" loading={props.loading} />
    </form>
);

export class LoginForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillReceiveProps(nextProps) {
        if (nextProps.loginSuccess !== this.props.loginSuccess && nextProps.loginSuccess) {
            window.location.href = window.location.pathname;
        }

        if (nextProps.error !== this.props.error && nextProps.error) {
            console.log(nextProps.error);
        }
    }

    loginAction = (evt) => {
        evt.preventDefault();
        const form = {};
        authkeys.forEach((key) => {
            form[key] = evt.target[key].value;
        });
        this.props.dispatch(doLogin(form));
    };

    render() {
        return (
            <div id="LoginForm-container" className="LoginForm-page">
                <Helmet>
                    <title>Login to Hermo</title>
                    <meta name="description" content="Form to facilitate logoin" />
                </Helmet>
                <section className="container">
                    <div className="loginForm-wrapper">
                        <Form action={this.loginAction} keys={authkeys} {...this.props} />
                    </div>
                </section>
            </div>
        );
    }
}

LoginForm.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

Form.propTypes = {
    action: PropTypes.func,
    keys: PropTypes.array,
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool,
    ]),
    loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    loading: makeSelectAuthLoading(),
    error: makeSelectAuthError(),
    loginSuccess: makeSelectAuthLoginSuccess(),
});

export function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'LoginForm', reducer });
const withSaga = injectSaga({ key: 'session', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(LoginForm);
