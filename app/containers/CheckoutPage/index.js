/**
 *
 * CheckoutPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import CartPage from 'containers/CartPage';

import makeSelectCheckoutPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class CheckoutPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <Helmet>
                    <title>CheckoutPage</title>
                    <meta name="description" content="Description of CheckoutPage" />
                </Helmet>
                <div>
                    <CartPage />
                    <div>will continue on checkout page when wireframe ready....</div>
                </div>
            </div>
        );
    }
}

CheckoutPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    checkoutpage: makeSelectCheckoutPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'checkoutPage', reducer });
const withSaga = injectSaga({ key: 'checkoutPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(CheckoutPage);
