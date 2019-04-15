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
import { getCheckout, updateQty } from './actions';

export class CartPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        this.props.dispatch(getCheckout());
    }

    deleteCart = (id) => {
        console.log('prod id: ', id);
    }

    addQty = (type, qty, id) => {
        if (qty <= 1 && type === 'remove') {
            return;
        }
        let quantity = qty;
        quantity = type === 'add' ? quantity += 1 : quantity -= 1;
        this.props.dispatch(updateQty(quantity, id));
    }

    cartList = () => (
        <div>
            {
                dataChecking(this.props.cartPage, 'data', 'merchants').map((merchant) => (
                    <div key={merchant.id}>
                        <div
                            className="p-1"
                            style={{
                                'backgroundColor': 'black',
                                'color': 'white',
                            }}
                        >
                            Sold and shipped by
                            <div className="text-uppercase">
                                <b>{merchant.name}</b>
                            </div>
                        </div>
                        <div
                            className="text-xs-center"
                            style={{ 'display': 'flex' }}
                        >
                            <div style={{ 'width': '383px' }}>cart item</div>
                            <div style={{ 'width': '100px' }}>unit price</div>
                            <div style={{ 'width': '100px' }}>qty</div>
                            <div style={{ 'width': '100px' }}>total</div>
                        </div>
                        {
                            merchant.items.map((item) => (
                                <div
                                    className="text-xs-center"
                                    style={{
                                        'display': 'flex',
                                        'alignItems': 'center',
                                    }}
                                    key={item.id}
                                >
                                    <div>
                                        <img src={item.product.image.small} alt="prod img"width="80px" />
                                    </div>
                                    <div style={{ 'width': '300px' }}>{item.product.name}</div>
                                    <div style={{ 'width': '100px' }}>RM {item.price.selling}</div>
                                    <div style={{ 'width': '100px' }}>
                                        <span
                                            className="px-quater"
                                            style={{ 'cursor': 'pointer' }}
                                            onClick={() => this.addQty('remove', item.qty, item.id)}
                                        >
                                            <i className="fa fa-caret-left"></i>
                                        </span>
                                        <span>
                                            {item.qty}
                                        </span>
                                        <span
                                            className="px-quater"
                                            style={{ 'cursor': 'pointer' }}
                                            onClick={() => this.addQty('add', item.qty, item.id)}
                                        >
                                            <i className="fa fa-caret-right"></i>
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    )
                )
            }
            {/* <a onClick={() => this.deleteCart(item.id)}>
                                            <i className="far fa-times-circle"></i>
                                        </a> */}
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
