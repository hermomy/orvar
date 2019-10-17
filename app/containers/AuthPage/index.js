/**
 *
 * AuthPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Grid, Container, Hidden, Button, Typography, Divider, FormControl } from '@material-ui/core';

import LoginForm from 'containers/LoginForm';
import SignUpPage from 'containers/SignUpPage';
import InputForm from 'components/InputForm';
import PopupDialog from 'components/PopupDialog';
import makeSelectAuthPage from './selectors';
import { resetPassword } from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class AuthPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            forgotDialog: false,
            forgotEmail: '',
        };
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.authPage.resetSuccess !== this.props.authPage.resetSuccess && nextProps.authPage.resetSuccess) {
            this.setState({ forgotDialog: false, forgotEmail: '' });
        }
    }
    onClickForgot = () => this.setState({ forgotDialog: true })
    onClose = () => {
        this.setState({
            forgotDialog: false,
            forgotEmail: '',
        });
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    };

    renderLite = () => {
        const variantLogin = this.state.login ? 'contained' : 'outlined';
        const variantSignup = this.state.login ? 'outlined' : 'contained';
        return (
            <div className="authpage-mobile mt-2">
                <Container className="btn">
                    <Grid container={true} spacing={1}>
                        <Grid item={true} xs={6}>
                            <Button
                                fullWidth={true}
                                variant={variantLogin}
                                color="primary"
                                className="btnLogin"
                                onClick={() => {
                                    this.setState({ login: true });
                                }}
                            >
                                <Typography>Log In</Typography>
                            </Button>
                        </Grid>
                        <Grid item={true} xs={6}>
                            <Button
                                fullWidth={true}
                                variant={variantSignup}
                                color="primary"
                                className="btnSignup"
                                onClick={() => {
                                    this.setState({ login: false });
                                }}
                            >
                                <Typography>Sign Up</Typography>
                            </Button>
                        </Grid>

                    </Grid>
                </Container>
                {this.state.login ? <LoginForm isModal={this.props.isModal} onClickForgot={this.onClickForgot} /> : <SignUpPage isModal={this.props.isModal} />}
            </div>
        );
    }

    render() {
        return (
            <div>
                {
                    this.props.isModal ?
                        this.renderLite()
                        :
                        <div>
                            <Hidden smDown={true}>
                                <Container className="authpage-desktop">
                                    <Grid container={true} justify="space-evenly">
                                        <Grid item={true}>
                                            <LoginForm onClickForgot={this.onClickForgot} />
                                        </Grid>
                                        <Grid item={true}>
                                            <SignUpPage />
                                        </Grid>
                                    </Grid>
                                </Container>
                            </Hidden>
                            <Hidden mdUp={true}>
                                {this.renderLite()}
                            </Hidden>
                        </div>
                }
                <PopupDialog
                    display={this.state.forgotDialog}
                    title="Reset Your Password"
                    onClose={() => this.onClose()}
                >
                    <Divider />
                    <form onSubmit={() => { this.props.dispatch(resetPassword(this.state.forgotEmail)); event.preventDefault(); }}>
                        <div className="p-1" style={{ textAlign: 'center' }} >
                            <Typography variant="body1">Please enter your registered email address so we can send you the reset instructions.</Typography>
                        </div>
                        <FormControl fullWidth={true}>
                            <InputForm
                                label="Email address"
                                placeholder="Enter your registered email address"
                                id="forgotEmail"
                                type="email"
                                handleChange={this.handleChange}
                                value={this.state.forgotEmail}
                                onClear={() => {
                                    this.setState({ forgotEmail: '' });
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth={true}>
                            <Button type="submit" variant="contained" color="primary">
                                Send me the instructions
                            </Button>
                        </FormControl>
                    </form>
                    <div className="p-1" style={{ textAlign: 'center' }} >
                        <Divider />
                        <Typography variant="caption">Trouble logging in? Drop our helpdesk an email admin@hermo.my or call 07-5623567</Typography>
                    </div>
                </PopupDialog>
            </div>
        );
    }
}

// AuthPage.propTypes = {
//     dispatch: PropTypes.func.isRequired,
// };

const mapStateToProps = createStructuredSelector({
    authPage: makeSelectAuthPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'authPage', reducer });
const withSaga = injectSaga({ key: 'authPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(AuthPage);
