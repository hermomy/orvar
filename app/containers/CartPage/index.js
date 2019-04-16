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

import makeSelectCartPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import { getCheckout, updateQty, removeItemInCart } from './actions';

export class CartPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(getCheckout());
    }

    deleteCart = (id) => {
        this.props.dispatch(removeItemInCart(id));
    }

    addQty = (type, qty, id) => {
        if (qty <= 1 && type === 'remove') {
            return;
        }
        let quantity = qty;
        quantity = type === 'add' ? quantity += 1 : quantity -= 1;
        this.props.dispatch(updateQty(quantity, id));
    }

    is_qty_adjustable = (item) => {
        if (item.attribute.is_qty_adjustable) {
            return (
                <div className="text-xs-center" style={{ width: '100px' }}>
                    <span
                        className="px-quater"
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.addQty('remove', item.qty, item.id)}
                    >
                        <i className="fa fa-caret-left hermo-pink"></i>
                    </span>
                    <span>
                        {item.qty}
                    </span>
                    <span
                        className="px-quater"
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.addQty('add', item.qty, item.id)}
                    >
                        <i className="fa fa-caret-right hermo-pink"></i>
                    </span>
                </div>
            );
        }
        return (
            <div className="text-xs-center" style={{ width: '100px' }}>
                <span>
                    {item.qty}
                </span>
            </div>
        );
    }

    cartList = () => (
        <div>
            {
                dataChecking(this.props.cartPage, 'data', 'merchants').map((merchant) => (
                    <div key={merchant.id}>
                        <div
                            className="p-half"
                            style={{
                                backgroundColor: 'black',
                                color: 'white',
                            }}
                        >
                            Sold and shipped by
                            <div className="text-uppercase">
                                <b>{merchant.name}</b>
                            </div>
                        </div>
                        <div
                            className="text-xs-center mt-1"
                            style={{ display: 'flex' }}
                        >
                            <div className="text-uppercase" style={{ width: '400px' }}>cart item</div>
                            <div className="text-uppercase" style={{ width: '100px' }}>unit price</div>
                            <div className="text-uppercase" style={{ width: '100px' }}>qty</div>
                            <div className="text-uppercase" style={{ width: '100px' }}>total</div>
                        </div>
                        {
                            merchant.items.map((item) => (
                                <div
                                    className="mb-1"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    key={item.id}
                                >
                                    <div style={{ width: '100px' }}>
                                        <img src={item.product.image.small} alt="prod img"width="80px" />
                                    </div>
                                    <div className="line-elips" style={{ width: '300px' }}>{item.product.name}</div>
                                    <div className="text-xs-center" style={{ width: '100px' }}>RM {item.price.selling}</div>
                                    {this.is_qty_adjustable(item)}
                                    <div className="text-xs-center" style={{ width: '100px' }}>RM {item.total.selling}</div>
                                    <div className="text-xs-center" style={{ width: '100px' }}>
                                        <span
                                            className="px-quater"
                                            onClick={() => this.deleteCart(item.id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <i className="far fa-times-circle"></i>
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    )
                )
            }
        </div>
    )

    render() {
        return (
            <div>
                {
                    dataChecking(this.props.cartPage, 'data', 'merchants') ?
                    this.cartList()
                    :
                    <div>
                        No Item Added
                    </div>
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
