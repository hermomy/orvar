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
import { Typography } from '@material-ui/core';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import TextField from '@material-ui/core/TextField';

import makeSelectSignUpPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class SignUpPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        dialog: true,
    };

    renderDialog= () => (
        <Dialog
            open={this.state.dialog}
            onClose={() => this.setState({ dialog: !this.state.dialog })}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <Typography></Typography>
        </Dialog>
    )

    render() {
        return (
            <div>
                {this.renderDialog()}
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
