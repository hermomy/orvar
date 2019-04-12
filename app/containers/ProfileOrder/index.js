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
        if (!this.state.popupOrder && !this.props.profileOrder.data.getOrderDetail) {
            return null;
        }
        return (
            <table>
                <tbody>
                    <tr>
                        <th>Sold and Shipped By</th>
                        <th>Tracking No</th>
                        <th>Courier</th>
                        <th>Order Status</th>
                    </tr>
                    <tr>
                        <tr>{}</tr>
                        <tr></tr>
                        <tr></tr>
                        <tr></tr>
                    </tr>
                </tbody>
            </table>
        );
    }

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
