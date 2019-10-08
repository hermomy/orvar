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
import { Grid, Container, Hidden, Button, Typography } from '@material-ui/core';

import LoginForm from 'containers/LoginForm';
import SignUpPage from 'containers/SignUpPage';

import makeSelectAuthPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class AuthPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            login: true,
        };
    }

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
                {this.state.login ? <LoginForm isModal={this.props.isModal} /> : <SignUpPage isModal={this.props.isModal} />}
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
                                            <LoginForm />
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
