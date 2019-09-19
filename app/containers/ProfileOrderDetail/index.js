/**
 *
 * ProfileOrderDetail
 *
 */

import React from 'react';
import { dataChecking } from 'globalUtils';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import PopupDialog from 'components/PopupDialog';
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
    Hidden,
    IconButton,
    Popover,
    Typography,
} from '@material-ui/core';
import {
    KeyboardArrowRight,
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

        popup: false,
        product: {},
        selectedType: [],
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

    renderDialogContent = () => (
        <form className="p-1">
            <div className="dialog-item-image pb-2">
                <img
                    src={dataChecking(this.state.product, 'image', 'small')}
                    alt="dialog_product_image"
                    width="100%"
                />
            </div>
            {
                dataChecking(this.state.selectedType, 'length') > 0 &&
                    this.state.selectedType.map((type, index) => (
                        <Typography key={index} color="textSecondary" display="block">• {type.name}</Typography>
                    ))
            }
        </form>
    )

    renderLabel = (item) => {
        if (dataChecking(item, 'product', 'url') && (dataChecking(item, 'product', 'url') === '/sample')) {
            if (dataChecking(item, 'price', 'selling') && (dataChecking(item, 'price', 'selling') !== 0)) {
                return (
                    <div className="item-label-container text-xs-center">
                        <img
                            src={require('resources/order/beauty_grab_label.png')}
                            alt="beauty-grab-label"
                            width="100%"
                            className="item-label"
                        />
                    </div>
                );
            }
            return (
                <div className="item-label-container text-xs-center">
                    <img
                        src={require('resources/order/free_item_label.png')}
                        alt="free-item-label"
                        width="100%"
                        className="item-label"
                    />
                </div>
            );
        }
        return (
            <div className="item-label-container text-xs-center" />
        );
    }

    renderPrice = (order, item) => (
        <div className="item-price pt-1">
            <div>
                <Typography style={{ fontWeight: 'bold' }}>
                    {order.currency.symbol}{item.price.selling.toFixed(2)}
                </Typography>
            </div>
            <div>
                <Typography>x {item.qty}</Typography>
            </div>
        </div>
    )

    renderBrand = (item) => (
        <div className="item-brand pb-half">
            <NavLink to={dataChecking(item, 'product', 'brand', 'url')} style={{ textDecoration: 'none' }}>
                <Typography
                    color="primary"
                    variant="button"
                    style={{ fontWeight: 'bold' }}
                >
                    {dataChecking(item, 'product', 'brand', 'name')}
                </Typography>
                <IconButton size="small" style={{ padding: '0 0 2px 3px' }}>
                    <KeyboardArrowRight color="primary" />
                </IconButton>
            </NavLink>
        </div>
    )

    renderDescription = (item) => (
        <div className="item-description-container">
            <Typography display="block" gutterBottom={true} className="item-description">{item.product.plain_name}</Typography>
        </div>
    )

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

    renderTrackingButton = (merchant) => (
        <Button
            variant="outlined"
            color="primary"
            disabled={merchant.summary.shipping.tracking_number === null}
            onClick={() => {
                window.TrackButton.track({ tracking_no: merchant.summary.shipping.tracking_number });
            }}
        >
            {
                merchant.summary.shipping.tracking_number !== null ?
                'track order'
                :
                'tracking not available'
            }
        </Button>
    )

    renderMerchantInfo = (order, merchant) => (
        <div style={{ paddingBottom: 16 }}>
            <div>
                <Typography color="textSecondary">Sold & Shipped by</Typography>
                <Typography color="textSecondary" style={{ float: 'right', paddingRight: 20 }}>Status</Typography>
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
                        marginTop: 5,
                    }}
                />
            </div>
            <Typography color="textSecondary" variant="body2">{merchant.logo.brief} ({merchant.shipping.estimate_arrival})</Typography>
            <Hidden lgUp={true}>
                <div className="pt-1">
                    {this.renderTrackingButton(merchant)}
                </div>
            </Hidden>
        </div>
    )

    renderCarousel = (order, merchant) => (
        <div style={{ padding: '16px 0' }}>
            <OwlCarousel
                options={{
                    items: 4,
                    loop: false,
                    nav: true,
                    navText: ['&lt;', '&gt;'],
                    responsive: {
                        320: {
                            items: 2,
                        },
                        700: {
                            items: 4,
                        },
                    },
                }}
                style={{ zIndex: 0 }}
            >
                {
                    dataChecking(this.props.profileOrderDetail, 'orderData', 'merchants') &&
                        merchant.items.map((item, index) => (
                            <Box
                                key={index}
                                className="item-card"
                                border={1}
                                borderColor="#F2F3F4"
                                borderRadius={5}
                                width="auto"
                                style={{ backgroundColor: '#FFFFFF' }}
                            >
                                <div className="item-image pb-1">
                                    <NavLink to={item.product.url}>
                                        <img src={item.product.image.large} alt="product_image" />
                                    </NavLink>
                                </div>
                                {this.renderLabel(item)}
                                {this.renderPrice(order, item)}
                                {this.renderBrand(item)}
                                {this.renderDescription(item)}
                                {
                                    item.items.length > 0 &&
                                        <Button
                                            fullWidth={true}
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                this.setState({ popup: !this.state.popup, selectedType: item.items, product: item.product });
                                            }}
                                        >
                                            view more
                                        </Button>
                                }
                            </Box>
                        ))
                }
            </OwlCarousel>
        </div>
    )

    renderOrderInfo = (infoConfigs) => (
        infoConfigs.map((config, index) => (
            <Grid key={index} container={true}>
                <Grid item={true} lg={6} md={6} xs={4}>
                    <Typography color="textSecondary" style={{ lineHeight: 2 }}>{config.label}</Typography>
                </Grid>
                <Grid item={true} lg={6} md={6} xs={8} align="right">
                    <Typography style={{ lineHeight: 2 }}>{config.dataPath}</Typography>
                </Grid>
            </Grid>
        ))
    )

    renderOrderDetailCard = () => {
        const order = this.props.profileOrderDetail.orderData;

        return (
            dataChecking(this.props.profileOrderDetail, 'orderData') &&
                <Grid container={true} spacing={2}>
                    <Grid item={true} lg={12} md={12} xs={12}>
                        <Card>
                            <CardContent>
                                <div className="order-header">
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
                                </div>
                                {
                                    dataChecking(this.props.profileOrderDetail, 'orderData', 'merchants').map((merchant, index) => (
                                        <div key={index} className="order-merchant">
                                            <Divider className="mt-1 mb-1" />
                                            <Grid container={true}>
                                                <Grid item={true} lg={9} md={12} xs={12}>
                                                    <Grid container={true}>
                                                        <Grid item={true} lg={11} md={12} xs={12}>
                                                            {this.renderMerchantInfo(order, merchant)}
                                                        </Grid>
                                                        <Grid item={true} lg={11} md={12} xs={12} style={{ backgroundColor: '#F6F6F6' }}>
                                                            {this.renderCarousel(order, merchant)}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item={true} lg={3} md={12} xs={12}>
                                                    <Grid container={true}>
                                                        <Hidden mdDown={true}>
                                                            <Grid item={true} lg={12} md={12} xs={12} className="mt-2">
                                                                {this.renderTrackingButton(merchant)}
                                                            </Grid>
                                                        </Hidden>
                                                        <Grid item={true} lg={12} md={12} xs={12} className="mt-3">
                                                            {
                                                                this.renderOrderInfo([
                                                                    { label: 'Courier', dataPath: merchant.summary.shipping.name },
                                                                    { label: 'Tracking Number', dataPath: merchant.summary.shipping.tracking_number !== null ? merchant.summary.shipping.tracking_number : 'Not Available' },
                                                                ])
                                                            }
                                                        </Grid>
                                                        <Grid item={true} lg={12} md={12} xs={12} className="mt-2">
                                                            {
                                                                this.renderOrderInfo([
                                                                    { label: 'Subtotal', dataPath: <span style={{ color: '#660033' }}>{order.currency.symbol} {merchant.summary.subtotal.toFixed(2)}</span> },
                                                                    { label: 'Shipping Fee', dataPath: `${order.currency.symbol} ${merchant.summary.shipping.value.toFixed(2)}` },
                                                                ])
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    ))
                                }
                                <div className="order-summary">
                                    <Divider className="mt-1 mb-1" />
                                    <Grid container={true}>
                                        <Hidden mdDown={true}>
                                            <Grid item={true} lg={9} />
                                        </Hidden>
                                        <Grid item={true} lg={3} md={12} xs={12}>
                                            {
                                                dataChecking(this.props.profileOrderDetail, 'orderData') &&
                                                    this.renderOrderInfo([
                                                        { label: <span style={{ color: '#FF4081' }}>Promotional Discount</span>, dataPath: <span style={{ color: '#FF4081' }}>- {order.currency.symbol} {order.summary.discount.total.toFixed(2)}</span> },
                                                        { label: 'Total', dataPath: <span style={{ color: '#660033' }}>{order.currency.symbol} {order.summary.grand_total.toFixed(2)}</span> },
                                                    ])
                                            }
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true} lg={6} md={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="primary">Payment Information</Typography>
                                <div className="mb-2" />
                                {
                                    dataChecking(this.props.profileOrderDetail, 'orderData', 'merchants').map((merchant) => (
                                        this.renderOrderInfo([
                                            { label: merchant.name, dataPath: `${order.currency.symbol} ${merchant.summary.subtotal.toFixed(2)}` },
                                        ])
                                    ))
                                }
                                {
                                    dataChecking(this.props.profileOrderDetail, 'orderData') &&
                                        this.renderOrderInfo([
                                            { label: 'Shipping Fee', dataPath: `${order.currency.symbol} ${order.summary.shipping.total.toFixed(2)}` },
                                            { label: <span style={{ color: '#FF4081' }}>Promotional Discount</span>, dataPath: <span style={{ color: '#FF4081' }}>- {order.currency.symbol} {order.summary.discount.total.toFixed(2)}</span> },
                                            { label: 'Total', dataPath: <span style={{ color: '#660033' }}>{order.currency.symbol} {order.summary.grand_total.toFixed(2)}</span> },
                                        ])
                                }
                                <div align="center" className="mt-3">
                                    <Typography color="textSecondary">**DISCOUNT IS NOT APPLICABLE ON HERMO GLOBAL PURCHASE</Typography>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true} lg={6} md={12} xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" color="primary" gutterBottom={true}>Shipping Information</Typography>
                                <div className="mb-2" />
                                {
                                    this.renderOrderInfo([
                                        { label: 'Receiver Name', dataPath: <span style={{ color: '#660033' }}>{dataChecking(order, 'address', 'receiver_name')}</span> },
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
                <PopupDialog
                    display={this.state.popup}
                    onClose={() => {
                        this.setState({ popup: false });
                    }}
                >
                    {this.renderDialogContent()}
                </PopupDialog>
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
