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

import { TextField, Button, Card, CardContent, CardActions, Container, FormControl, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ErrorMessage from 'components/ErrorMessage';
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
    render() {
        return (
            <Container className={this.props.classes.card}>
                <div className="mb-1 text-xs-center">
                    <Typography variant="h4">Welcome to Hermo</Typography>
                </div>
                <Card>
                    <form onSubmit={() => { this.props.dispatch(doLogin(this.state)); event.preventDefault(); }}>
                        <CardContent>
                            <FormControl fullWidth={true}>
                                <TextField
                                    id="email"
                                    label="Email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    margin="normal"
                                />
                            </FormControl>
                            <FormControl fullWidth={true}>
                                <TextField
                                    id="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                            {
                                this.props.loginForm.error && <ErrorMessage error={this.props.loginForm.error} type="danger" />
                            }
                        </CardContent>
                        <CardActions>
                            <FormControl fullWidth={true} className="text-xs-center">
                                <Button type="submit" variant="contained" color="primary">
                                    Log In
                                </Button>
                            </FormControl>
                        </CardActions>
                    </form>
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
