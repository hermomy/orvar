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
import { withRouter, NavLink } from 'react-router-dom';
import Pagination from 'components/Pagination';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Async from 'assets/react-async';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardHeader from '@material-ui/core/CardHeader';
// import Button from '@material-ui/core/Button';
// import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Tune from '@material-ui/icons/Tune';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ControlPoint from '@material-ui/icons/ControlPoint';
import RemoveCircleOutlined from '@material-ui/icons/RemoveCircleOutlined';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import makeSelectProfileOrder from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import styles from './materialStyle';

const getDetail = (link) => apiRequest(`${link}`, 'get');
// checkredundant(order, orders, newOrders)

export class ProfileOrder extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        category: '',
        pageNum: 3,
        detailURL: '',
        orders: null,
        newOrder: '',
        merchants: null,
        listitem: { '1': 'for skip checking' },
    }

    componentWillMount() {
        this.setState({ getList: apiRequest(`/order${this.state.category}?page=${this.state.pageNum}`, 'get') });
        this.topbarcontent = [
            {
                category: '',
                name: '',
            },
            {
                category: '/to-paid',
                name: 'Unpaid',
            },
            {
                category: '/to-ship',
                name: 'To Ship',
            },
            {
                category: '/to-receive',
                name: 'Posted',
            },
            {
                category: '/reviewable',
                name: 'Review',
            },
        ];
    }

    checkOpen = (array, targetorder, condition) => {
        let obj = '';
        if (array === 1) {
            obj = { ...this.state.orders };
        } else if (array === 2) {
            obj = { ...this.state.merchants };
        }
        if (condition === 'toggle') {
            if (!obj[targetorder]) {
                obj[targetorder] = targetorder;
            } else {
                delete obj[targetorder];
            }
            if (array === 1) {
                this.setState({ orders: obj, newOrder: targetorder });
            } else if (array === 2) {
                this.setState({ merchants: obj, newOrder: targetorder });
            }
        } else {
            if (obj[targetorder]) {
                return true;
            }
            return false;
        }
        return null;
    }

    logiclistitem = (addminus, ordernumber, merchantname) => {
        const obj = { ...this.state.listitem };
        if (!obj[`${merchantname}_${ordernumber}`]) {
            obj[`${merchantname}_${ordernumber}`] = 1;
        } else {
            obj[`${merchantname}_${ordernumber}`] += addminus;
        }
        this.setState({ listitem: obj });
    }

    renderTopBar = () => (
        <div>
            <AppBar position="static" className={this.props.classes.Appbar}>
                <Toolbar>
                    <NavLink to="/profile">
                        <IconButton>
                            <ChevronLeft />
                        </IconButton>
                    </NavLink>
                    <div>
                        {
                            this.topbarcontent.map((content) => (
                                <Typography inline={true} className={this.props.classes.AppBarSection} onClick={() => this.setState({ category: content.category })}>
                                    {content.name}
                                </Typography>
                            ))
                        }
                    </div>
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
        this.setState({ callListAPI: false });
        return data.data.items.map((Order) =>
        (
            <Card key={Order.number} className="mb-2">
                <CardContent>
                    <Grid container={true} spacing={0}>
                        <Grid item={true} xs={8}>
                            <Typography>Order Number</Typography>
                            <Typography>{Order.number}</Typography>
                        </Grid>
                        <Grid item={true} xs={3}>
                            <Button disabled={true}>
                                <ErrorOutline style={{ transform: 'rotate(180deg)', color: 'black' }} /><br />
                                <Typography inline={true}>{Order.created_at}</Typography>
                            </Button>
                        </Grid>
                        <Grid item={true} xs={1}>
                            {
                                !this.checkOpen(1, Order.number, 'check') ?
                                    <KeyboardArrowDown style={{ float: 'right' }} onClick={() => this.checkOpen(1, Order.number, 'toggle')} />
                                :
                                    <KeyboardArrowUp style={{ float: 'right' }} onClick={() => this.checkOpen(1, Order.number, 'toggle')} />
                            }
                        </Grid>
                    </Grid>
                    <Divider style={{ margin: '10px 0' }} />
                    {
                        this.checkOpen(1, Order.number, 'check') ?
                            this.renderMerchantList(Order._links.self.href, Order.number, Order.currency.symbol)
                        :
                            null
                    }
                    <Grid container={true} spacing={0}>
                        <Grid item={true} xs={11}>
                            <Typography>View Order Details</Typography>
                        </Grid>
                        <Grid item={true} xs={1}>
                            <Typography>Total</Typography>
                            <Typography>{Order.currency.symbol}{Order.subtotal}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        ));
    }

    renderMerchantList = (link, ordernumber) => (
        <Async promise={getDetail(link, ordernumber, this.state.orders, this.state.newOrder)}>
            <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
            <Async.Resolved>
                {(data) => (
                    <div>
                        {
                            data.data.merchants.map((merchant) => (
                                <div key={merchant.name} className="mb-1">
                                    <Grid container={true} spacing={0}>
                                        <Grid item={true} xs={7}>
                                            <div>
                                                <Typography>Merchant</Typography>
                                                <Typography>{merchant.name}</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item={true} xs={4}>
                                            <Typography>Status</Typography>
                                            <Typography>{merchant.summary.shipping.status}</Typography>
                                        </Grid>
                                        <Grid item={true} xs={1}>
                                            {
                                                !this.checkOpen(2, ordernumber, 'check') ?
                                                    <ControlPoint style={{ float: 'right' }} onClick={() => this.checkOpen(2, ordernumber, 'toggle')} />
                                                :
                                                    <RemoveCircleOutlined style={{ float: 'right' }} onClick={() => this.checkOpen(2, ordernumber, 'toggle')} />
                                            }
                                        </Grid>
                                    </Grid>
                                    {/* {
                                        this.checkOpen(2, ordernumber, 'check') ?
                                            this.renderOrderDetail(merchant, currency, ordernumber)
                                        :
                                            null
                                    } */}
                                    <Divider />
                                </div>
                            ))
                        }
                    </div>
                    )
                }
            </Async.Resolved>
            <Async.Rejected>
                { console.error }
            </Async.Rejected>
        </Async>
    )

    renderItem = (merchant, merchantname, ordernumber, currency, number) => (
        <div style={{ width: '20%', height: '100%', display: 'inline-block' }}>
            <img
                src={merchant.items[this.state.listitem[`${merchantname}_${ordernumber}`] + number || number].product.image.small}
                width="60%"
                alt=""
            /><br />
            <Typography inline={true}>
                {merchant.items[this.state.listitem[`${merchantname}_${ordernumber}`] + number || number].name}
            </Typography><br />
            <Typography inline={true}>
                {merchant.items[this.state.listitem[`${merchantname}_${ordernumber}`] + number || number].qty} x {currency}
                {merchant.items[this.state.listitem[`${merchantname}_${ordernumber}`] + number || number].price.retail}
            </Typography>
        </div>
    )

    renderOrderDetail = (merchant, currency, ordernumber) => (
        <div style={{ position: 'relative', marginTop: '10px' }}>
            <div>
                {merchant.items.length >= 1 ? this.renderItem(merchant, merchant.name, ordernumber, currency, 0) : null}
                {merchant.items.length >= 2 ? this.renderItem(merchant, merchant.name, ordernumber, currency, 1) : null}
                {merchant.items.length >= 3 ? this.renderItem(merchant, merchant.name, ordernumber, currency, 2) : null}
                <Button
                    onClick={() => { this.logiclistitem(-1, ordernumber, merchant.name); }}
                    disabled={this.state.listitem[`${merchant.name}_${ordernumber}`] === 0 || !this.state.listitem[`${merchant.name}_${ordernumber}`]}
                    classes={{ root: this.props.classes.walletButton }}
                    style={{ position: 'absolute', top: '25%', left: '0' }}
                >
                    <KeyboardArrowLeft />
                </Button>
                <Button
                    onClick={() => { this.logiclistitem(1, ordernumber, merchant.name); }}
                    disabled={`${merchant.items.length - 3}` <= `${this.state.listitem[`${merchant.name}_${ordernumber}`] || 0}`}
                    classes={{ root: this.props.classes.walletButton }}
                    style={{ position: 'absolute', top: '25%', right: '35%' }}
                >
                    <KeyboardArrowRight />
                </Button>
            </div>
            <div style={{ position: 'absolute', width: '35%', height: '100%', right: '0', top: '0', borderLeft: '1px gray solid' }}>
                <Typography inline={true}>guhfdsuijsoersiujo</Typography><br />
            </div>
        </div>
    )

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

    // renderOrderDetail = (data) => {
    //     const orderlistdetail = dataChecking(data, 'data');
    //     return (
    //         <div>
    //             <div>
    //                 <br />
    //                 <table border="1">
    //                     <tbody>
    //                         <tr>
    //                             <th>Sold and Shipped By</th>
    //                             <th>Tracking No</th>
    //                             <th>Courier</th>
    //                             <th>Order Status</th>
    //                         </tr>
    //                         {
    //                             dataChecking(orderlistdetail, 'merchants') ?
    //                             orderlistdetail.merchants.map((merchant) => (
    //                                 <tr key={merchant.id}>
    //                                     <td>{merchant.name}</td>
    //                                     <td>{merchant.tracking_number ? `${merchant.tracking_number}` : '-'}</td>
    //                                     <td>{merchant.summary.shipping.name}</td>
    //                                     <td>{merchant.summary.shipping.status}</td>
    //                                 </tr>
    //                             ))
    //                             :
    //                             null
    //                         }
    //                     </tbody>
    //                 </table>
    //             </div>
    //             <div>
    //                 {
    //                     dataChecking(orderlistdetail, 'merchants') ?
    //                     orderlistdetail.merchants.map((merchant) => (
    //                         <div key={merchant.id} >
    //                             <table border="1">
    //                                 <tbody>
    //                                     <tr>
    //                                         <td>
    //                                             <span>Sold and Shipped By</span><br />
    //                                             <span>{merchant.name}</span>
    //                                         </td>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td>
    //                                             <span>{merchant.logo.brief}<br /></span><br />
    //                                             <span>{merchant.shipping.estimate_arrival}</span>
    //                                         </td>
    //                                     </tr>
    //                                     <tr>
    //                                         <td></td>
    //                                         <td>CART ITEM</td>
    //                                         <td>UNIT PRICE</td>
    //                                         <td>QTY</td>
    //                                         <td>TOTAL</td>
    //                                     </tr>
    //                                     {
    //                                         dataChecking(merchant, 'items') ?
    //                                         merchant.items.map((item) => (
    //                                             <tr key={item.id}>
    //                                                 <NavLink to={`${item._applink ? `/mall/${item._applink.id}` : '/mall'}`} ><td><img src={item.product.image.small} alt="" /></td></NavLink>
    //                                                 <td>{item.product.name}</td>
    //                                                 <td>{orderlistdetail.currency.symbol}{item.price.selling}</td>
    //                                                 <td>{item.qty}</td>
    //                                                 <td>{orderlistdetail.currency.symbol}{item.subtotal}</td>
    //                                             </tr>
    //                                         ))
    //                                         :
    //                                         null
    //                                     }
    //                                 </tbody>
    //                             </table>
    //                             {
    //                                 dataChecking(orderlistdetail, 'summary', 'subtotal') ?
    //                                 orderlistdetail.summary.subtotal.map((subtotal) => (
    //                                     <div key={subtotal.id} style={{ backgroundColor: 'pink' }}>
    //                                         <span>Subtotal</span><br />
    //                                         <span>{orderlistdetail.currency.symbol}{subtotal.subtotal}</span><br />
    //                                         <span>Shipping Fee</span><br />
    //                                         <span>{orderlistdetail.currency.symbol}{subtotal.shipping}</span><br />
    //                                         <span>Total</span><br />
    //                                         <span>{orderlistdetail.currency.symbol}{subtotal.total}</span><br />
    //                                     </div>
    //                                 ))
    //                                 :
    //                                 null
    //                             }
    //                         </div>
    //                     ))
    //                     :
    //                     null
    //                 }
    //             </div>
    //             {this.renderPaymentInformation(orderlistdetail)}
    //             {this.renderShippingInformation(orderlistdetail)}
    //         </div>
    //     );
    // }

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
                <div className="container">
                    {this.renderTopBar()}
                    <Async promise={this.state.getList}>
                        <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                        <Async.Resolved>
                            {(datalist) => (
                                <div>
                                    {this.renderOrderlist(datalist)}
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
