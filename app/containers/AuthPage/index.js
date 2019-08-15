/**
 *
 * AuthPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { Grid } from '@material-ui/core';

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
            email: '',
            password: '',
        };
    }


    // logIn = () => {
    //     console.log('test');
    //     return (
    //         <div>
    //             <LoginForm />
    //             <SignUpPage />
    //         </div>

    //     );
    // }
    render() {
        return (
            <Grid container={true}>
                <Grid item={true}>
                    <LoginForm />
                </Grid>
                <Grid item={true}>
                    <SignUpPage />
                </Grid>
            </Grid>
        );
    }
}

AuthPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

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
