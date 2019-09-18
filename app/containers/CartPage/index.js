/**
 *
 * CartPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking } from 'globalUtils';

import CartList from 'components/CartList';
import { getCheckout, updateQty, removeItemInCart } from './actions';
import makeSelectCartPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class CartPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.props.dispatch(getCheckout());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cartPage.data !== this.props.cartPage.data) {
            this.setState({ data: nextProps.cartPage.data });
        }
    }

    changeQuantity = (type, qty, id) => {
        if (qty <= 1 && type === 'remove') {
            return;
        }
        let quantity = qty;
        quantity += type === 'add' ? 1 : -1;
        this.props.dispatch(updateQty(quantity, id));
    }

    deleteCart = (id) => {
        this.props.dispatch(removeItemInCart(id));
    }

    cartList = () => (
        <div>
            {
                dataChecking(this.state, 'data', 'merchants').map((merchant) => (
                    <CartList
                        cart={this.state.data}
                        merchant={merchant}
                        changeQuantity={this.changeQuantity}
                        deleteCart={this.deleteCart}
                        key={merchant.id}
                    />
                    )
                )
            }
        </div>
    )

    render() {
        return (
            <div>
                {
                   dataChecking(this.state, 'data', 'merchants') ?
                   this.cartList()
                   :
                   <div>no item added..</div>
                }
            </div>
        );
    }
}

CartPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    cartPage: makeSelectCartPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'cartPage', reducer });
const withSaga = injectSaga({ key: 'cartPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(CartPage);
