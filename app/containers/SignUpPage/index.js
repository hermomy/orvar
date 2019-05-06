/**
 *
 * SignUpPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectSignUpPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class SignUpPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        dialog: true,
    };

    render() {
        return (
            <div>
            </div>
        );
    }
}

SignUpPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    signUpPage: makeSelectSignUpPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'signUpPage', reducer });
const withSaga = injectSaga({ key: 'signUpPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(SignUpPage);
