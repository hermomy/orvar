/**
 *
 * ProfileOrderList
 *
 */

import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import moment from 'moment';
import NavTab from 'components/NavigationTab';

import {
    Button,
    Card,
    CircularProgress,
    Container,
    Hidden,
    IconButton,
    Popover,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@material-ui/core';
import {
    KeyboardArrowRight,
    QueryBuilder,
} from '@material-ui/icons';

import makeSelectProfileOrderList from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileOrderList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        orderStatusConfigs: [
            { title: 'All Orders', urlParam: '' },
            { title: 'To Pay', urlParam: '/to-paid' },
            { title: 'To Ship', urlParam: '/to-ship' },
            { title: 'To Receive', urlParam: '/to-receive' },
            { title: 'To Review', urlParam: '/to-review' },
            { title: 'Cancelled', urlParam: '/canceled' },
        ],

        anchorEl: null,
        orderDate: '',

        page: 0,
        rowsPerPage: 10,
    }

    componentWillMount() {
        this.props.dispatch(actions.getOrderList({ urlParam: '', pageCount: 1, orderCount: this.state.rowsPerPage }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profileOrderList !== this.props.profileOrderList) {
            if (dataChecking(nextProps, 'profileOrderList', 'orderMeta', 'currentPage')) {
                this.setState({ page: (nextProps.profileOrderList.orderMeta.currentPage - 1) });
            }
        }
    }

    renderStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'paid' || 'cod received' || 'received' || 'posted' || 'cod posted':
                return '#00B047';
            case 'in process' || 'pending':
                return '#E98800';
            case 'unpaid' || 'cod unpaid' || 'cod rejected' || 'cod delivery failed' || 'cod returned':
                return '#F50000';
            case 'cancel' || 'expired' || 'shipment_delayed' || 'deleted' || 'cod cancel' || 'cod shipment delayed':
                return '#B7B7B7';
            default:
                break;
        }

        return null;
    }

    renderStatus = (order) => {
        const arr = Object.keys(order.attribute).filter((a) => (a === 'is_payable' || a === 'is_receivable' || a === 'is_reviewable') && order.attribute[a]);
        if (arr.length) {
            return arr.map((attr, index) => {
                if (order.attribute[attr]) {
                    switch (attr) {
                        case 'is_payable':
                            return (
                                <Button
                                    key={index}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        console.log('clicked payable', order.id);
                                    }}
                                >
                                    <Typography>Pay Now</Typography>
                                </Button>
                            );
                        case 'is_receivable':
                            return (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        console.log('clicked receivable', order.id);
                                    }}
                                >
                                    <Typography>Confirm Received</Typography>
                                </Button>
                            );
                        case 'is_reviewable':
                            return (
                                <Button
                                    key={index}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => {
                                        console.log('clicked reviewable', order.id);
                                    }}
                                >
                                    <Typography>Rate &amp; Review</Typography>
                                </Button>
                            );
                        default:
                            return null;
                    }
                }
                return null;
            });
        }
        return <Typography style={{ color: this.renderStatusColor(order.status) }}>{order.status}</Typography>;
    }

    renderOrderListCard = (urlParam) => {
        if (!this.props.profileOrderList.orderList) {
            return null;
        }

        return (
            <Card style={{ overflowX: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography>Order</Typography></TableCell>
                            <Hidden xsDown={true}>
                                <TableCell><Typography>Date Created</Typography></TableCell>
                                <TableCell><Typography>Courier</Typography></TableCell>
                            </Hidden>
                            <TableCell><Typography>Amount</Typography></TableCell>
                            <TableCell><Typography>Status</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataChecking(this.props.profileOrderList, 'orderList') &&
                            this.props.profileOrderList.orderList.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <NavLink to={`order/${order.id}`} style={{ textDecoration: 'none' }}>
                                            <Typography color="secondary">
                                                {order.number}
                                            </Typography>
                                            <IconButton size="small">
                                                <KeyboardArrowRight color="secondary" />
                                            </IconButton>
                                        </NavLink>
                                    </TableCell>
                                    <Hidden xsDown={true}>
                                        <TableCell>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                style={{ marginRight: 5 }}
                                                onClick={(event) => {
                                                    this.setState({
                                                        anchorEl: event.currentTarget,
                                                        orderDate: order.created_at,
                                                    });
                                                }}
                                            >
                                                <QueryBuilder />
                                            </IconButton>
                                            <Typography>{moment(order.created_at).fromNow()}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{order.courier}</Typography>
                                        </TableCell>
                                    </Hidden>
                                    <TableCell>
                                        <Typography>{order.currency.symbol + order.subtotal.toFixed(2)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        {this.renderStatus(order)}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[10, 25, 40]}
                    rowsPerPage={this.state.rowsPerPage}
                    count={dataChecking(this.props.profileOrderList, 'orderMeta', 'totalCount')}
                    page={this.state.page}
                    onChangePage={(event, newPage) => {
                        this.props.dispatch(actions.getOrderList({ urlParam, pageCount: (newPage + 1), orderCount: this.state.rowsPerPage }));
                        this.setState({ page: newPage });
                    }}
                    onChangeRowsPerPage={(event) => {
                        this.props.dispatch(actions.getOrderList({ urlParam, pageCount: 1, orderCount: event.target.value }));
                        this.setState({ page: 0, rowsPerPage: event.target.value });
                    }}
                />
            </Card>
        );
    }

    render() {
        return (
            <div>
                <NavTab
                    isOrderList="true"
                    tabs={this.state.orderStatusConfigs.map((config) => (
                        {
                            title: config.title,
                            urlParam: config.urlParam,
                            ordersPerPage: this.state.rowsPerPage,
                            description: (
                                <div align="center" style={{ margin: 16 }}>
                                    <Typography variant="h6" display="block" gutterBottom={true}>{config.title}</Typography>
                                    <Typography display="block">Click on the order number to view your order details.</Typography>
                                    <Typography>Confirm receipt of your order to get 20 credits.</Typography>
                                </div>
                            ),
                            content: (
                                <Container>
                                    {
                                        this.props.profileOrderList.loading ?
                                            <div style={{ textAlign: 'center' }}><CircularProgress /></div>
                                            :
                                            <div>
                                                {this.renderOrderListCard(config.urlParam)}
                                            </div>
                                    }
                                </Container>
                            ),
                        }
                    ))}
                />
                <Popover
                    open={Boolean(this.state.anchorEl)}
                    anchorEl={this.state.anchorEl}
                    onClose={() => {
                        this.setState({ anchorEl: null });
                    }}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                    }}
                >
                    <div style={{ padding: 10 }}><Typography>{this.state.orderDate}</Typography></div>
                </Popover>
            </div>
        );
    }
}

ProfileOrderList.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileOrderList: makeSelectProfileOrderList(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileOrderList', reducer });
const withSaga = injectSaga({ key: 'profileOrderList', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileOrderList);
