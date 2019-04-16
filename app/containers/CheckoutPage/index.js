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

import { dataChecking } from 'globalUtils';
import makeSelectCheckoutPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getCheckout, updateQty, removeItemInCart } from './actions';

export class CheckoutPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(getCheckout());
    }

    addQty = (type, qty, id) => {
        if (qty <= 1 && type === 'remove') {
            return;
        }
        let quantity = qty;
        quantity = type === 'add' ? quantity += 1 : quantity -= 1;
        this.props.dispatch(updateQty(quantity, id));
    }

    deleteCart = (id) => {
        this.props.dispatch(removeItemInCart(id));
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>CheckoutPage</title>
                    <meta name="description" content="Description of CheckoutPage" />
                </Helmet>
                {
                    this.props.header ?
                        <CartPage
                            addQty={this.addQty}
                            deleteCart={this.deleteCart}
                            data={dataChecking(this.props, 'checkoutpage')}
                        />
                    :
                    <div>
                        <CartPage
                            addQty={this.addQty}
                            deleteCart={this.deleteCart}
                            data={dataChecking(this.props, 'checkoutpage')}
                        />
                        lorem
                    </div>
                }
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
