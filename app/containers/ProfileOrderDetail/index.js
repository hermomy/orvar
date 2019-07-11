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
// import ProductCard from 'components/ProductCard';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    CircularProgress,
    Collapse,
    Container,
    Divider,
    Grid,
    IconButton,
    Popover,
    Typography,
} from '@material-ui/core';
import {
    ErrorOutline,
} from '@material-ui/icons';

import makeSelectProfileOrderDetail from './selectors';
import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class ProfileOrderDetail extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        anchorEl: null,
        targetOrderID: null,
        orderDate: '',
    }

    componentWillMount() {
        this.props.dispatch(actions.getOrderList());
    }

    renderOrderListCard = () => {
        const orderData = this.props.profileOrderDetail.orderData;

        if (!this.props.profileOrderDetail.orderList) {
            return null;
        }

        return (
            dataChecking(this.props.profileOrderDetail, 'orderList') &&
                this.props.profileOrderDetail.orderList.map((order, index) => (
                    <Card key={index} className="mb-2">
                        <CardHeader
                            title={
                                <Typography display="block" color="textSecondary">Order Number</Typography>
                            }
                            subheader={
                                <Typography style={{ color: '#6298FF' }}>{order.number}</Typography>
                            }
                            action={
                                <div style={{ paddingTop: 20 }}>
                                    <IconButton
                                        size="small"
                                        onClick={(event) => {
                                            this.setState({
                                                anchorEl: event.currentTarget,
                                                orderDate: order.created_at,
                                            });
                                        }}
                                    >
                                        <ErrorOutline style={{ transform: 'rotate(180deg)', color: 'black', fontSize: 16 }} />
                                    </IconButton>
                                    <Typography>{moment(order.created_at).fromNow()}</Typography>
                                </div>
                            }
                        />
                        <Divider />
                        <CardActions>
                            <Grid container={true}>
                                <Grid item={true} lg={11} md={11} xs={9}>
                                    <Button
                                        color="secondary"
                                        style={{ textTransform: 'none' }}
                                        onClick={() => {
                                            this.setState({
                                                targetOrderID: order.id,
                                            });

                                            if (dataChecking(this.props.profileOrderDetail, 'orderData', 'id') !== order.id) {
                                                this.props.dispatch(actions.getOrderData(order.id));
                                            }
                                        }}
                                    >
                                        View order details
                                    </Button>
                                </Grid>
                                <Grid item={true} lg={1} md={1} xs={3}>
                                    <Typography display="block" color="textSecondary">Total</Typography>
                                    <Typography color="primary">{order.currency.symbol}{order.subtotal.toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                        </CardActions>
                        {
                            this.state.targetOrderID === order.id ?
                                <Collapse in={Boolean(this.state.targetOrderID)}>
                                    {
                                        this.props.profileOrderDetail.loadingData ?
                                            <div style={{ textAlign: 'center' }}><CircularProgress /></div>
                                            :
                                            <div>
                                                {this.renderOrderDetails()}
                                                <Divider className="mb-2" />
                                                <Grid container={true}>
                                                    <Grid item={true} lg={6} md={6} xs={12}>
                                                        <Typography color="primary">Payment Information</Typography>
                                                        {
                                                            this.renderInfoCard([
                                                                { label: 'Shipping Fee', dataPath: dataChecking(orderData, 'currency', 'symbol') + dataChecking(orderData, 'summary', 'shipping', 'total') },
                                                                { label: 'Promotional Discount', dataPath: dataChecking(orderData, 'currency', 'symbol') + dataChecking(orderData, 'summary', 'discount', 'total') },
                                                                { label: 'Total', dataPath: dataChecking(orderData, 'currency', 'symbol') + dataChecking(orderData, 'summary', 'grand_total') },
                                                            ])
                                                        }
                                                    </Grid>
                                                    <Grid item={true} lg={6} md={6} xs={12}>
                                                        <Typography color="primary">Shipping Information</Typography>
                                                        {
                                                            this.renderInfoCard([
                                                                { label: 'Receiver Name', dataPath: dataChecking(orderData, 'address', 'receiver_name') },
                                                                { label: 'Address', dataPath: dataChecking(orderData, 'address', 'full_address') },
                                                                { label: 'Contact Number', dataPath: dataChecking(orderData, 'address', 'full_contact') },
                                                                { label: 'Payment Method', dataPath: dataChecking(orderData, 'gateway_name') },
                                                            ])
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </div>
                                    }
                                </Collapse>
                                :
                                null
                        }
                    </Card>
                ))
        );
    }

    renderOrderDetails = () => {
        const orderData = this.props.profileOrderDetail.orderData;

        return (
            dataChecking(this.props.profileOrderDetail, 'orderData') &&
                orderData.merchants.map((merchant, index) => (
                    <div key={index}>
                        <Divider className="mb-2" />
                        <Grid container={true} spacing={5}>
                            <Grid item={true} lg={6} md={6} xs={12}>
                                <Typography variant="body2" display="block" color="textSecondary">Sold & Shipped by</Typography>
                                <Typography variant="body1" display="block" color="primary" style={{ textTransform: 'uppercase' }}>{merchant.name}</Typography>
                                <Typography variant="body2" display="block" color="textSecondary">{merchant.logo.brief} ({merchant.shipping.estimate_arrival})</Typography>
                            </Grid>
                            <Grid item={true} lg={3} md={3} xs={12}>
                                <Typography variant="body2" display="block" color="textSecondary">Status</Typography>
                                <div style={{ borderRadius: 100, backgroundColor: '#C5E3BF', width: 80, height: 20, marginTop: 5 }}>
                                    <Typography align="center" variant="body2" display="block" style={{ textTransform: 'uppercase' }}>{merchant.summary.shipping.status}</Typography>
                                </div>
                            </Grid>
                            <Grid item={true} lg={3} md={3} xs={12}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    disabled={merchant.summary.shipping.tracking_number === null}
                                >
                                    {
                                        merchant.summary.shipping.tracking_number === null ?
                                        'tracking not available'
                                        :
                                        'track order'
                                    }
                                </Button>
                            </Grid>
                            <Grid item={true} lg={9} md={9} xs={12}>
                                {this.renderCarousel(orderData, merchant)}
                            </Grid>
                            <Grid item={true} lg={3} md={3} xs={12}>
                                {
                                    this.renderInfoCard([
                                        { label: 'Courier', dataPath: merchant.summary.shipping.name },
                                        { label: 'Tracking Number', dataPath: merchant.summary.shipping.tracking_number !== null ? merchant.summary.shipping.tracking_number : 'Not Available' },
                                        { label: 'Quanity', dataPath: merchant.items.length },
                                        { label: 'Shipping Fee', dataPath: orderData.currency.symbol + merchant.summary.shipping.value.toFixed(2) },
                                        { label: 'Subtotal', dataPath: orderData.currency.symbol + merchant.summary.subtotal.toFixed(2) },
                                    ])
                                }
                            </Grid>
                        </Grid>
                    </div>
                ))
        );
    }

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

    renderInfoCard = (infoConfigs) => (
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

    render() {
        return (
            <Container>
                {
                    this.props.profileOrderDetail.loading ?
                        <div style={{ textAlign: 'center' }}><CircularProgress /></div>
                        :
                        <div>
                            {this.renderOrderListCard()}
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
                    <Typography variant="subtitle1" style={{ margin: 10 }}>{this.state.orderDate}</Typography>
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
