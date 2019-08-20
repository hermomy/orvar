/**
 *
 * LoginForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import globalScope from 'globalScope';

import { Button, Card, CardContent, CardActions, Container, FormControl, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ErrorMessage from 'components/ErrorMessage';
import InputForm from 'components/InputForm';
import makeSelectLoginForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import { doLogin } from './actions';
import './style.scss';
import styles from './materialStyle';

export class LoginForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showPassword: false,
            clearField: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loginForm.loginSuccess !== this.props.loginSuccess && nextProps.loginForm.loginSuccess) {
            window.location.href = globalScope.previousPage || window.location.pathname;
            console.log(window.location.href);
        }

        if (nextProps.error !== this.props.error && nextProps.error) {
            console.log(nextProps.error);
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState((state) => ({ showPassword: !state.showPassword }));
    }

    render() {
        return (
            <Container className={this.props.classes.card}>
                <Card>
                    <Container className="p-3">
                        <div className=" mt-2 pl-1">
                            <Typography variant="h5" color="primary"><b>Welcome back!</b></Typography>
                            <Typography variant="h6" color="textSecondary"><br />Lets go shopping.</Typography>
                        </div>
                        <form onSubmit={() => { this.props.dispatch(doLogin(this.state)); event.preventDefault(); }}>
                            <CardContent>
                                <FormControl fullWidth={true}>
                                    <InputForm
                                        label="Email address"
                                        id="email"
                                        handleChange={this.handleChange}
                                        value={this.state.email}
                                        onClear={() => {
                                            this.setState({ email: '' });
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true}>
                                    <InputForm
                                        label="Password"
                                        id="password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        showPassword={this.state.showPassword}
                                        handleChange={this.handleChange}
                                        handleClickShowPassword={this.handleClickShowPassword}
                                        onClear={() => {
                                            this.setState({ password: '' });
                                        }}
                                        togglePassword={true}
                                    />
                                </FormControl>
                                <FormControl fullWidth={true} className="mt-1">
                                    <Typography variant="caption" color="textSecondary">Password should contain at least 8 characters.</Typography>
                                    <Typography variant="caption" color="textSecondary"><u>Forgot Password?</u></Typography>
                                </FormControl>
                                {
                                    this.props.loginForm.error && <ErrorMessage error={this.props.loginForm.error} type="danger" />
                                }
                            </CardContent>
                            <CardActions>
                                <FormControl fullWidth={true} className="text-xs-center">
                                    <Button type="submit" variant="contained" color="primary">
                                        <Typography>Login</Typography>
                                    </Button>
                                </FormControl>
                            </CardActions>
                        </form>
                        <div className="text-xs-center">
                            <Typography variant="h6">or<br /></Typography>
                            <Typography className="mt-1" variant="caption" color="textSecondary">By logging, you agree to our <br /><u>Terms Conditions</u></Typography>
                        </div>

                    </Container>
                </Card>
            </Container>
        );
    }
}

LoginForm.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    loginForm: makeSelectLoginForm(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginForm', reducer });
const withSaga = injectSaga({ key: 'loginForm', saga });

export default compose(
    withReducer,
    withSaga,
    withStyles(styles),
    withConnect,
)(LoginForm);

