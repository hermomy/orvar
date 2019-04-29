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
import { NavLink, withRouter } from 'react-router-dom';
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
        category: '',
    }

    componentWillMount() {
        if (dataChecking(this.props, 'match', 'params', 'profilePart')) {
            if (this.props.match.params.profilePart === 'canceled' ||
                this.props.match.params.profilePart === 'to-paid' ||
                this.props.match.params.profilePart === 'to-ship') {
                this.props.dispatch(getOrder(`/${this.props.match.params.profilePart}`));
            }
        } else {
            this.props.dispatch(getOrder(''));
        }
    }

    renderOrderlist = () => {
        if (!dataChecking(this.props, 'profileOrder', 'data', 'orderListData', 'items')) {
            return null;
        }
        return this.props.profileOrder.data.orderListData.items.map((Order) =>
        (
            <tr key={Order.id}>
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
        } else if (this.props.profileOrder.data.orderListData._meta.pageCount <= 1) {
            return null;
        }
        return (
            <Pagination
                parentProps={this.props}
                meta={this.props.profileOrder.data.orderListData._meta}
                link={this.props.profileOrder.data.orderListData._links}
                goToPage={1}
                isHerlisting={false}
                callBack={(targetpage) => { this.props.dispatch(getOrder('', targetpage)); }}
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
                    <br />
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>Sold and Shipped By</th>
                                <th>Tracking No</th>
                                <th>Courier</th>
                                <th>Order Status</th>
                            </tr>
                            {
                                dataChecking(orderlistdetail, 'merchants') ?
                                orderlistdetail.merchants.map((merchant) => (
                                    <tr key={merchant.id}>
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
                        orderlistdetail.merchants.map((merchant) => (
                            <div key={merchant.id} >
                                <table border="1">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span>Sold and Shipped By</span><br />
                                                <span>{merchant.name}</span>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <span>{merchant.logo.brief}<br /></span><br />
                                                <span>{merchant.shipping.estimate_arrival}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>CART ITEM</td>
                                            <td>UNIT PRICE</td>
                                            <td>QTY</td>
                                            <td>TOTAL</td>
                                        </tr>
                                        {
                                            dataChecking(merchant, 'items') ?
                                            merchant.items.map((item) => (
                                                <tr key={item.id}>
                                                    <NavLink to={`${item._applink ? `/mall/${item._applink.id}` : '/mall'}`} ><td><img src={item.product.image.small} alt="" /></td></NavLink>
                                                    <td>{item.product.name}</td>
                                                    <td>{orderlistdetail.currency.symbol}{item.price.selling}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{orderlistdetail.currency.symbol}{item.subtotal}</td>
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
                                        <div key={subtotal.id} style={{ backgroundColor: 'pink' }}>
                                            <span>Subtotal</span><br />
                                            <span>{orderlistdetail.currency.symbol}{subtotal.subtotal}</span><br />
                                            <span>Shipping Fee</span><br />
                                            <span>{orderlistdetail.currency.symbol}{subtotal.shipping}</span><br />
                                            <span>Total</span><br />
                                            <span>{orderlistdetail.currency.symbol}{subtotal.total}</span><br />
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
                        <span>{item.text}</span><br />
                        <span>-{orderlistdetail.currency.symbol}{item.value}</span><br />
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
        <div style={{ backgroundColor: 'yellow' }}>
            {
                dataChecking(orderlistdetail, 'address') ?
                    <div >
                        <span>Order No.</span><br />
                        {dataChecking(orderlistdetail, 'number') ? <span>{orderlistdetail.number}</span> : null}<br />
                        <span>Receiver Name</span><br />
                        <span>{orderlistdetail.address.receiver_name}</span><br />
                        <span>Shipping Address</span><br />
                        <span>{orderlistdetail.address.full_address}</span><br />
                        <span>Contract No.</span><br />
                        <span>{orderlistdetail.address.full_contact}</span><br />
                        <span>Payment Method</span><br />
                        {dataChecking(orderlistdetail, 'gateway_name') ? <span>{orderlistdetail.gateway_name}</span> : null}<br />
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
                <input type="button" onClick={() => { this.props.dispatch(getOrder('')); this.setState({ category: '' }); }} value="All Orders" />
                <input type="button" onClick={() => { this.props.dispatch(getOrder('/reviewable')); this.setState({ category: '/reviewable' }); }} value="Reviewable Orders" />
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
    withRouter,
    withReducer,
    withSaga,
    withConnect,
)(ProfileOrder);
