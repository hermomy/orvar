/**
 *
 * ProfileOrder
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { dataChecking, apiRequest } from 'globalUtils';
import { NavLink, withRouter } from 'react-router-dom';
import Pagination from 'components/Pagination';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Async from 'react-async';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
// import Button from '@material-ui/core/Button';
// import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Tune from '@material-ui/icons/Tune';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

import makeSelectProfileOrder from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';


const getList = (callListAPI, category, pageNum) => callListAPI ? apiRequest(`/order${category}?page=${pageNum}`, 'get') : null;

const getDetail = (callDetailAPI, link) => callDetailAPI ? apiRequest(`${link}`, 'get') : null;

export class ProfileOrder extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        callListAPI: true,
        category: '',
        pageNum: 1,
        callDetailAPI: true,
        detailURL: '',
        popupOrder: false,
    }

    componentWillMount() {
        // if (dataChecking(this.props, 'match', 'params', 'profilePart')) {
        //     if (this.props.match.params.profilePart === 'canceled' ||
        //         this.props.match.params.profilePart === 'to-paid' ||
        //         this.props.match.params.profilePart === 'to-ship') {
        //         this.props.dispatch(getOrder(`/${this.props.match.params.profilePart}`));
        //     }
        // } else {
        //     this.props.dispatch(getOrder(''));
        // }
    }

    renderTopBar = () => (
        <div>
            <AppBar position="static" className={this.props.classes.Appbar}>
                <Toolbar>
                    <IconButton>
                        <ChevronLeft />
                    </IconButton>
                    <div>
                        <Typography inline={true} className={this.props.classes.AppBarSection} onClick={() => this.setState({ category: '' })}>
                            All Order
                        </Typography>
                        <Typography inline={true} className={this.props.classes.AppBarSection} onClick={() => this.setState({ category: '/to-paid' })}>
                            Unpaid
                        </Typography>
                        <Typography inline={true} className={this.props.classes.AppBarSection} onClick={() => this.setState({ category: '/to-ship' })}>
                            To Ship
                        </Typography>
                        <Typography inline={true} className={this.props.classes.AppBarSection} onClick={() => this.setState({ category: '/to-receive' })}>
                            Posted
                        </Typography>
                        <Typography inline={true} className={this.props.classes.AppBarSection} onClick={() => this.setState({ category: '/reviewable' })}>
                            Review
                        </Typography>
                    </div>
                    {/* why can't float :( */}
                    <IconButton style={{ position: 'absolute', right: '8px' }}>
                        <Tune />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )

    renderOrderlist = (data) => {
        if (!dataChecking(data, 'data', 'items')) {
            return null;
        }
        return data.data.items.map((Order) =>
        (
            // <tr key={Order.id}>
            //     <td>
            //         <div onClick={() => { this.setState({ popupOrder: !this.state.popupOrder }); this.setState({ detailURL: `${Order._links.self.href}` }); }}>
            //             {Order.number}
            //         </div>
            //     </td>
            //     <td>{Order.created_at}</td>
            //     <td>{Order.courier}</td>
            //     <td>{Order.currency.symbol}{Order.subtotal}</td>
            //     <td>{Order.status}</td>
            // </tr>
            <Card classes={{ root: this.props.classes.Card }}>
                <CardContent classes={{ root: this.props.classes.Card }}>
                    <Grid container={true} spacing={0}>
                        <Grid item={true} xs={6}>
                            <Typography>Order Number</Typography>
                            <Typography>{Order.number}</Typography>
                        </Grid>
                        <Grid item={true} xs={3}>
                            <Typography>Status</Typography>
                            <Typography>{Order.status}</Typography>
                        </Grid>
                        <Grid item={true} xs={2}>
                            <ErrorOutline style={{ transform: 'rotate(180deg)' }} />
                            <Typography inline={true}>{Order.created_at}</Typography>
                        </Grid>
                        <Grid item={true} xs={1}>
                            <KeyboardArrowDown style={{ float: 'right' }} />
                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '10px 0' }} />
                    <Grid container={true} spacing={0}>
                        <Grid item={true} xs={10}>
                            <Typography>View Order Details</Typography>
                        </Grid>
                        <Grid item={true} xs={2}>
                            <Typography>Total</Typography>
                            <Typography>{Order.currency.symbol}{Order.subtotal}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        ));
    }

    renderPagination = (data) => {
        if (!dataChecking(data, 'data', 'items')) {
            return null;
        } else if (data.data._meta.pageCount <= 1) {
            return null;
        }
        return (
            <Pagination
                parentProps={data}
                meta={data.data._meta}
                link={data.data._links}
                goToPage={1}
                isHerlisting={false}
                callBack={(targetpage) => { this.setState({ pageNum: targetpage }); }}
            />
        );
    }

    renderOrderDetail = (data) => {
        const orderlistdetail = dataChecking(data, 'data');
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
        return (
            <div>
                {this.renderTopBar()}
                <div className="container">
                    {/* <input type="button" onClick={() => { this.setState({ category: '' }); }} value="All Orders" />
                    <input type="button" onClick={() => { this.setState({ category: '/' }); }} value="Reviewable Orders" /> */}
                    <Async promise={getList(this.state.callListAPI, this.state.category, this.state.pageNum)}>
                        <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                        <Async.Resolved>
                            {(datalist) => (
                                <div>
                                    {console.log(datalist)}
                                    {this.renderPagination(datalist)}
                                    {/* <table border="1">
                                        <tbody> */}
                                    {this.renderOrderlist(datalist)}
                                    {/* </tbody>
                                    </table> */}
                                    {
                                        this.state.popupOrder ?
                                            <Async promise={getDetail(this.state.callDetailAPI, this.state.detailURL)}>
                                                <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                                                <Async.Resolved>
                                                    {(datadetail) => (
                                                        <div>
                                                            {this.renderOrderDetail(datadetail)}
                                                        </div>
                                                        )
                                                    }
                                                </Async.Resolved>
                                                <Async.Rejected>
                                                    { console.error }
                                                </Async.Rejected>
                                            </Async>
                                        :
                                            null
                                    }
                                </div>
                                )
                            }
                        </Async.Resolved>
                        <Async.Rejected>
                            { console.error }
                        </Async.Rejected>
                    </Async>
                </div>
            </div>
        );
    }
}

ProfileOrder.propTypes = {
    // dispatch: PropTypes.func.isRequired,
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
    withWidth(),
    withStyles(styles),
    withRouter,
    withReducer,
    withSaga,
    withConnect,
)(ProfileOrder);
