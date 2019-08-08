/**
 *
 * ProfileWallet
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import NavigationTab from 'components/NavigationTab';

import makeSelectProfileWallet from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileWallet extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <NavigationTab />
            </div>
        );
    }
}

ProfileWallet.propTypes = {
    dispatch: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
    profileWallet: makeSelectProfileWallet(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileWallet', reducer });
const withSaga = injectSaga({ key: 'profileWallet', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileWallet);
