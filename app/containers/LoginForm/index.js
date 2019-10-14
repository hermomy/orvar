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

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import globalScope from 'globalScope';

import {
    Button,
    ButtonBase,
    Card,
    CardActions,
    Container,
    FormControl,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { dataChecking } from 'globalUtils';

import ErrorMessage from 'components/ErrorMessage';
import InputForm from 'components/InputForm';
import makeSelectLoginForm from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
    doLogin,
    getImageLink,
} from './actions';
import './style.scss';
import styles from './materialStyle';

export class LoginForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showPassword: false,
        };
    }
    componentDidMount() {
        this.props.dispatch(getImageLink());
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.loginForm.loginSuccess !== this.props.loginSuccess && nextProps.loginForm.loginSuccess) {
            window.location.href = globalScope.previousPage || '/';
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

    cardHeader = () => {
        if (this.props.isModal) {
            return (
                <div className="pl-1">
                    <Typography variant="h5" color="primary">
                        <b>Log in now!</b>
                    </Typography>
                </div>
            );
        }
        return (
            <div className=" mt-2 pl-1">
                <Typography variant="h5" color="primary">
                    <b>{dataChecking(this.props.loginForm, 'image', 'items') && this.props.loginForm.image.items[0].title}</b>
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    <br />{dataChecking(this.props.loginForm, 'image', 'items') && this.props.loginForm.image.items[0].brief}
                </Typography>
            </div>
        );
    }

    formInput = () => (
        <div>
            <FormControl fullWidth={true}>
                <InputForm
                    label="Email address"
                    id="email"
                    type="email"
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
                    autoComplete="off"
                    togglePassword={true}
                />
            </FormControl>
        </div>
    )
    // Need update on function
    forgotPassword = () => (
        <FormControl>
            <ButtonBase onClick={() => this.props.onClickForgot()}>
                <u>Forgot Password?</u>
            </ButtonBase>
        </FormControl>
    )

    formAction = () => (
        <FormControl fullWidth={true} className="text-xs-center">
            <Button type="submit" variant="contained" color="primary">
                <Typography>Login</Typography>
            </Button>
            <Typography className="text-xs-center my-half" variant="h6">or<br /></Typography>
            <FacebookLogin
                appId={process.env.FACEBOOK_APP_ID}
                autoLoad={true}
                // callback={responseFacebook}
                render={() => (
                    <Button
                        type="button"
                        variant="contained"
                        style={{ backgroundColor: '#3b5998', color: 'white' }}
                    >
                        LOGIN WITH FACEBOOK
                    </Button>
                )}
            />
        </FormControl>
    )

    render() {
        return (
            <Container className={this.props.classes.card}>
                <Card>
                    <Container className="p-3">
                        {this.cardHeader()}
                        <form onSubmit={() => { this.props.dispatch(doLogin(this.state)); event.preventDefault(); }}>
                            <div className="py-1 px-1">
                                {this.formInput()}
                                {this.forgotPassword()}
                                {
                                    this.props.loginForm.error && <ErrorMessage error={this.props.loginForm.error} type="danger" />
                                }
                            </div>
                            <CardActions>
                                {this.formAction()}
                            </CardActions>
                        </form>
                        <div className="text-xs-center">
                            <Typography className="mt-1" variant="caption" color="textSecondary">
                                By logging, you agree to our <br /><a href="https://www.hermo.my/about#/userterm?ucf=login-modal"><u>Terms & Conditions</u></a>
                            </Typography>
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

