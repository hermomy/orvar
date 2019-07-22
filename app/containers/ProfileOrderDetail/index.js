/**
 *
 * ProfileOrderDetail
 *
 */

import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import moment from 'moment';
import OwlCarousel from 'react-owl-carousel2';
import 'assets/react-owl-carousel2.style.scss';

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
    IconButton,
    Popover,
    Typography,
} from '@material-ui/core';
import {
    QueryBuilder,
} from '@material-ui/icons';

import makeSelectProfileOrderDetail from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileOrderDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        anchorEl: null,
        orderDate: '',
    }

    componentWillMount() {
        this.props.dispatch(actions.getOrderData(this.props.match.params.orderID));
    }

    componentDidMount() {
        const script = document.createElement('script');

        script.src = 'https://www.tracking.my/track-button.js';
        script.async = true;

        document.body.appendChild(script);
    }

    renderStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'paid':
                return '#71F888';
            case 'received':
                return '#98DBFF';
            case 'unpaid':
                return '#EEEEEE';
            case 'in process':
                return '#FCCC4C';
            case 'multiple':
                return '#FC4CCD';
            case 'expired':
                return '#FDC789';
            case 'posted':
                return '#660033';
            case 'cancel':
                return '#FFFFFF';
            default:
                break;
        }

        return null;
    }

    renderMerchantInfo = (order, merchant) => (
        <div>
            <div>
                <Typography color="textSecondary">Sold & Shipped by</Typography>
                <Typography color="textSecondary" style={{ float: 'right' }}>Status</Typography>
            </div>
            <div>
                <Typography variant="h6" color="primary" style={{ textTransform: 'uppercase' }}>{merchant.name}</Typography>
                <Chip
                    label={order.status}
                    variant="outlined"
                    size="small"
                    style={{
                        backgroundColor: this.renderStatusColor(order.status),
                        color: (order.status.toLowerCase() === 'multiple' || order.status.toLowerCase() === 'posted') ? '#FFFFFF' : '#000000',
                        float: 'right',
                    }}
                />
            </div>
            <Typography color="textSecondary">{merchant.logo.brief} ({merchant.shipping.estimate_arrival})</Typography>
        </div>
    )

    renderCarousel = (orderData, merchant) => (
        <OwlCarousel
            options={{
                items: 4,
                loop: false,
                nav: true,
                navText: ['&lt;', '&gt;'],
            }}
            style={{ zIndex: 0 }}
        >
            {
                dataChecking(this.props.profileOrderDetail, 'orderData', 'merchants') &&
                    merchant.items.map((item, index) => (
                        <Box
                            key={index}
                            border={1}
                            borderColor="#F2F3F4"
                            borderRadius={5}
                            className="item-card"
                        >
                            <img src={item.product.image.large} alt="product" />
                            <div className="item-name">
                                <Typography variant="body2" color="primary">{item.name}</Typography>
                            </div>
                            <Typography variant="body2" display="block">{item.qty} x {orderData.currency.symbol}{item.price.selling.toFixed(2)}</Typography>
                        </Box>
                    ))
            }
        </OwlCarousel>
    )

    renderOrderInfo = (infoConfigs) => (
        infoConfigs.map((config, index) => (
            <Grid key={index} container={true}>
                <Grid item={true} lg={6} md={6} xs={6}>
                    <Typography variant="body2">{config.label}</Typography>
                </Grid>
                <Grid item={true} lg={6} md={6} xs={6}>
                    <Typography variant="body2">{config.dataPath}</Typography>
                </Grid>
            </Grid>
        ))
    )

    renderOrderDetailCard = () => {
        const order = this.props.profileOrderDetail.orderData;

        if (!order) {
            return null;
        }

        return (
            dataChecking(this.props.profileOrderDetail, 'orderData') &&
                <Grid container={true} spacing={2}>
                    <Grid item={true} lg={12} md={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography color="textSecondary">Order Number</Typography>
                                <div style={{ float: 'right' }}>
                                    <IconButton
                                        size="small"
                                        color="primary"
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
                                </div>
                                <Typography display="block" color="primary">{order.number}</Typography>
                                {
                                    order.merchants.map((merchant, index) => (
                                        <div key={index}>
                                            <Divider />
                                            <Grid container={true}>
                                                <Grid item={true} lg={8} md={12} xs={12}>
                                                    <Grid container={true}>
                                                        <Grid item={true} lg={12} md={12} xs={12}>
                                                            {this.renderMerchantInfo(order, merchant)}
                                                        </Grid>
                                                        <Grid item={true} lg={12} md={12} xs={12}>
                                                            {this.renderCarousel(order, merchant)}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item={true} lg={4} md={12} xs={12}>
                                                    <Grid container={true}>
                                                        <Grid item={true} lg={12} md={12} xs={12}>
                                                            <Button
                                                                variant="outlined"
                                                                color="primary"
                                                                disabled={merchant.summary.shipping.tracking_number === null}
                                                                onClick={() => {
                                                                    window.TrackButton.track({ tracking_no: merchant.summary.shipping.tracking_number });
                                                                }}
                                                                style={{ float: 'right' }}
                                                            >
                                                                {
                                                                    merchant.summary.shipping.tracking_number !== null ?
                                                                    `track order ${merchant.summary.shipping.tracking_number}`
                                                                    :
                                                                    'tracking not available'
                                                                }
                                                            </Button>
                                                        </Grid>
                                                        <Grid item={true} lg={12} md={12} xs={12}>
                                                            {
                                                                this.renderOrderInfo([
                                                                    { label: 'Courier', dataPath: merchant.summary.shipping.name },
                                                                    { label: 'Tracking Number', dataPath: merchant.summary.shipping.tracking_number !== null ? merchant.summary.shipping.tracking_number : 'Not Available' },
                                                                ])
                                                            }
                                                        </Grid>
                                                        <Grid item={true} lg={12} md={12} xs={12} className="mt-3">
                                                            {
                                                                this.renderOrderInfo([
                                                                    { label: 'Quanity', dataPath: merchant.items.length },
                                                                    { label: 'Shipping Fee', dataPath: `${dataChecking(order, 'currency', 'symbol')} ${merchant.summary.shipping.value.toFixed(2)}` },
                                                                    { label: 'Subtotal', dataPath: `${dataChecking(order, 'currency', 'symbol')} ${merchant.summary.subtotal.toFixed(2)}` },
                                                                ])
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ))
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true} lg={6} md={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography color="primary">Payment Information</Typography>
                                {
                                    this.renderOrderInfo([
                                        { label: 'Shipping Fee', dataPath: `${dataChecking(order, 'currency', 'symbol')} ${dataChecking(order, 'summary', 'shipping', 'total')}` },
                                        { label: 'Promotional Discount', dataPath: `${dataChecking(order, 'currency', 'symbol')} ${dataChecking(order, 'summary', 'discount', 'total')}` },
                                        { label: 'Total', dataPath: `${dataChecking(order, 'currency', 'symbol')} ${dataChecking(order, 'summary', 'grand_total')}` },
                                    ])
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true} lg={6} md={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography color="primary">Shipping Information</Typography>
                                {
                                    this.renderOrderInfo([
                                        { label: 'Receiver Name', dataPath: dataChecking(order, 'address', 'receiver_name') },
                                        { label: 'Address', dataPath: dataChecking(order, 'address', 'full_address') },
                                        { label: 'Contact Number', dataPath: dataChecking(order, 'address', 'full_contact') },
                                        { label: 'Payment Method', dataPath: dataChecking(order, 'gateway_name') },
                                    ])
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
        );
    }

    render() {
        return (
            <Container>
                {
                    this.props.profileOrderDetail.loading ?
                        <div style={{ textAlign: 'center' }}><CircularProgress /></div>
                        :
                        <div>
                            {this.renderOrderDetailCard()}
                        </div>
                }
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
            </Container>
        );
    }
}

ProfileOrderDetail.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileOrderDetail: makeSelectProfileOrderDetail(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileOrderDetail', reducer });
const withSaga = injectSaga({ key: 'profileOrderDetail', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ProfileOrderDetail);
