/**
 *
 * ProfileOrder
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { dataChecking } from 'globalUtils';
import Pagination from 'components/Pagination';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectProfileOrder from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import {
    getOrder,
    getOrderDetail,
} from './actions';

export class ProfileOrder extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        popupOrder: false,
    }

    componentWillMount() {
        this.props.dispatch(getOrder());
    }

    renderOrderlist = () => {
        if (!dataChecking(this.props, 'profileOrder', 'data', 'orderListData', 'items')) {
            return null;
        }
        return this.props.profileOrder.data.orderListData.items.map((Order, index) =>
        (
            <tr key={index}>
                <td>
                    <div onClick={() => { this.setState({ popupOrder: !this.state.popupOrder }); this.props.dispatch(getOrderDetail(Order._links.self.href)); }}>
                        {Order.number}
                    </div>
                </td>
                <td>{Order.created_at}</td>
                <td>{Order.courier}</td>
                <td>{Order.currency.symbol}{Order.subtotal}</td>
                <td>{Order.status}</td>
            </tr>
        ));
    }

    renderPagination = () => {
        if (!dataChecking(this.props, 'profileOrder', 'data', 'orderListData', 'items')) {
            return null;
        }
        return (
            <Pagination
                parentProps={this.props}
                meta={this.props.profileOrder.data.orderListData._meta}
                link={this.props.profileOrder.data.orderListData._links}
                goToPage={1}
                checking={1}
            />
        );
    }

    renderOrderDetail = () => {
        if (!this.state.popupOrder && !dataChecking(this.props, 'profileOrder', 'data', 'orderListDetail')) {
            return null;
        }
        const orderlistdetail = dataChecking(this.props, 'profileOrder', 'data', 'orderListDetail');
        return (
            <div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>Sold and Shipped By</th>
                                <th>Tracking No</th>
                                <th>Courier</th>
                                <th>Order Status</th>
                            </tr>
                            <tr>
                                <td></td>
                                {dataChecking(orderlistdetail, 'tracking_number') ? <td>{orderlistdetail.tracking_number}</td> : null}
                                {dataChecking(orderlistdetail, 'courier') ? <td>{orderlistdetail.courier}</td> : null}
                                {dataChecking(orderlistdetail, 'status') ? <td>{orderlistdetail.status}</td> : null}
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <div>
                            <span>Sold and Shipped By</span>
                            {
                                dataChecking(orderlistdetail, 'merchants') ?
                                orderlistdetail.merchants.map((merchant) => (
                                    <div style={{ float: 'right' }}>
                                        <span>{merchant.logo.brief}<br /></span>
                                        <span>{merchant.shipping.estimate_arrival}</span>
                                    </div>
                                ))
                                :
                                null
                            }
                        </div>
                    </div>
                </div>

                <div>
                    <br />
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>CART ITEM</th>
                                <th>UNIT PRICE</th>
                                <th>QTY</th>
                                <th>TOTAL</th>
                            </tr>
                            {
                                dataChecking(orderlistdetail, 'merchants') ?
                                orderlistdetail.merchants.map((merchant) => (
                                    dataChecking(merchant, 'items') ?
                                    merchant.items.map((item) => (
                                        <tr>
                                            <img src={item.product.image.small} alt="" />
                                            <td>{item.product.name}</td>
                                            <td>{orderlistdetail.currency.symbol}{item.price.selling}</td>
                                            <td>{item.qty}</td>
                                            <td>{orderlistdetail.currency.symbol}{item.subtotal}</td>
                                        </tr>
                                    ))
                                    :
                                    null
                                ))
                                :
                                null
                            }
                        </tbody>
                    </table>
                </div>

                {
                    dataChecking(orderlistdetail, 'summary', 'subtotal') ?
                    orderlistdetail.summary.subtotal.map((subtotal) => (
                        <div>
                            <span>Subtotal</span>
                            <span>{orderlistdetail.currency.symbol}{subtotal.subtotal}</span>
                            <span>Shipping Fee</span>
                            <span>{orderlistdetail.currency.symbol}{subtotal.shipping}</span>
                            <span>Total</span>
                            <span>{orderlistdetail.currency.symbol}{subtotal.total}</span>
                        </div>
                    ))
                    :
                    null
                }

                {this.renderPaymentInformation(orderlistdetail)}
                {this.renderShippingInformation(orderlistdetail)}
            </div>
        );
    }

    // ????? WHERE TO GET FROM HERMO
    // shipping fee need?
    renderPaymentInformation = (orderlistdetail) => (
        <div>
            <div>
                <span>Subtotal</span>
            </div>
            <div>
                <span>FROM HERMO</span>
                {
                    dataChecking(orderlistdetail, 'summary', 'subtotal') ?
                    orderlistdetail.summary.subtotal.map((subtotal) => (
                        <span>{orderlistdetail.currency.symbol}{subtotal.subtotal}</span>
                    ))
                    :
                    null
                }
            </div>
            <div>
                {
                    dataChecking(orderlistdetail, 'summary', 'discount', 'items') ?
                    orderlistdetail.summary.discount.items.map((item) => (
                        <div>
                            <span>{item.text}</span>
                            <span>-{orderlistdetail.currency.symbol}{item.value}</span>
                        </div>
                    ))
                    :
                    null
                }
            </div>
            <div>
                <span>TOTAL</span>
                {
                    dataChecking(orderlistdetail, 'summary', 'subtotal') ?
                    orderlistdetail.summary.subtotal.map((subtotal) => (
                        <span>{orderlistdetail.currency.symbol}{subtotal.subtotal}</span>
                    ))
                    :
                    null
                }
            </div>
            <div>
                {
                    dataChecking(orderlistdetail, 'remarks') ?
                    orderlistdetail.remarks.map((remark) => (
                        remark.key === 'subtotal' ? <span>{remark.value}</span> : null
                    ))
                    :
                    null
                }
            </div>
        </div>
    )

    renderShippingInformation = (orderlistdetail) => (
        <div>
            {
                dataChecking(orderlistdetail, 'address') ?
                    <div>
                        <span>Order No.</span>
                        {dataChecking(orderlistdetail, 'number') ? <span>{orderlistdetail.number}</span> : null}
                        <span>Receiver Name</span>
                        <span>{orderlistdetail.address.receiver_name}</span>
                        <span>Shipping Address</span>
                        <span>{orderlistdetail.address.full_address}</span>
                        <span>Contract No.</span>
                        <span>{orderlistdetail.address.full_contact}</span>
                        <span>Payment Method</span>
                        {dataChecking(orderlistdetail, 'gateway_name') ? <span>{orderlistdetail.gateway_name}</span> : null}
                    </div>
                :
                null
            }
        </div>
    )

    render() {
        console.log(this.props);
        return (
            <div>
                {this.renderPagination()}
                <table border="1">
                    <tbody>
                        {this.renderOrderlist()}
                    </tbody>
                </table>
                {this.renderOrderDetail()}
            </div>
        );
    }
}

ProfileOrder.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileOrder: makeSelectProfileOrder(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileOrder', reducer });
const withSaga = injectSaga({ key: 'profileOrder', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileOrder);
