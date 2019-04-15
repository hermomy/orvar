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
import { NavLink } from 'react-router-dom';
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
                            {
                                dataChecking(orderlistdetail, 'merchants') ?
                                orderlistdetail.merchants.map((merchant, index) => (
                                    <tr key={index}>
                                        <td>{merchant.name}</td>
                                        <td>{merchant.tracking_number ? `${merchant.tracking_number}` : '-'}</td>
                                        <td>{merchant.summary.shipping.name}</td>
                                        <td>{merchant.summary.shipping.status}</td>
                                    </tr>
                                ))
                                :
                                null
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    {
                        dataChecking(orderlistdetail, 'merchants') ?
                        orderlistdetail.merchants.map((merchant, index) => (
                            <div>
                                <div>
                                    <span>Sold and Shipped By</span>
                                    <span>{merchant.name}</span>
                                </div>
                                <div key={index} style={{ float: 'right' }}>
                                    <span>{merchant.logo.brief}<br /></span>
                                    <span>{merchant.shipping.estimate_arrival}</span>
                                </div>
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
                                            dataChecking(merchant, 'items') ?
                                            merchant.items.map((item) => (
                                                <tr key={index}>
                                                    <NavLink to={`${item._applink ? `/mall/${item._applink.id}` : '/mall'}`} >
                                                        <td><img src={item.product.image.small} alt="" /></td>
                                                        <td>{item.product.name}</td>
                                                        <td>{orderlistdetail.currency.symbol}{item.price.selling}</td>
                                                        <td>{item.qty}</td>
                                                        <td>{orderlistdetail.currency.symbol}{item.subtotal}</td>
                                                    </NavLink>
                                                </tr>
                                            ))
                                            :
                                            null
                                        }
                                    </tbody>
                                </table>
                                {
                                    dataChecking(orderlistdetail, 'summary', 'subtotal') ?
                                    orderlistdetail.summary.subtotal.map((subtotal) => (
                                        <div key={index}>
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
                            </div>
                        ))
                        :
                        null
                    }
                </div>
                {this.renderPaymentInformation(orderlistdetail)}
                {this.renderShippingInformation(orderlistdetail)}
            </div>
        );
    }

    // ????? WHERE TO GET FROM HERMO
    // shipping fee need?
    renderPaymentInformation = (orderlistdetail) => (
        <div style={{ backgroundColor: 'lime' }}>
            <div>
                <span>Subtotal</span>
            </div>
            <div>
                {
                    dataChecking(orderlistdetail, 'merchants') ?
                        orderlistdetail.merchants.map((merchant, index) => (
                            <div key={index}>
                                <span>FROM {merchant.name}</span>
                                <span>{orderlistdetail.currency.symbol}{merchant.summary.subtotal}</span>
                            </div>
                        ))
                    :
                    null
                }
            </div>
            {
                dataChecking(orderlistdetail, 'summary', 'shipping') ?
                    orderlistdetail.summary.shipping.total !== 0 ?
                        <div>
                            <span>Shipping Fee</span>
                            <span>{orderlistdetail.currency.symbol}{orderlistdetail.summary.shipping.total}</span>
                        </div>
                    :
                    null
                :
                null
            }
            {
                dataChecking(orderlistdetail, 'summary', 'discount', 'items') ?
                orderlistdetail.summary.discount.items.map((item, index) => (
                    <div key={index}>
                        <span>{item.text}</span>
                        <span>-{orderlistdetail.currency.symbol}{item.value}</span>
                    </div>
                ))
                :
                null
            }
            <div>
                <span>TOTAL</span>
                {
                    dataChecking(orderlistdetail, 'summary', 'grand_total') ?
                        <span>{orderlistdetail.currency.symbol}{orderlistdetail.summary.grand_total}</span>
                        :
                        null
                }
            </div>
            <div>
                {
                    dataChecking(orderlistdetail, 'remarks') ?
                    orderlistdetail.remarks.map((remark, index) => (
                        remark.key === 'subtotal' ? <span key={index}>{remark.value}</span> : null
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
