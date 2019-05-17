/**
 *
 * ProfileWholePage
 *
 */
// import ProfilePage from 'containers/ProfilePage';
// import ProfileOrder from 'containers/ProfileOrder';
// import ProfileWishlist from 'containers/ProfileWishlist';
// import ProfileWallet from 'containers/ProfileWallet';
// import ProfileReview from 'containers/ProfileReview';
// import LogoutForm from 'containers/LogoutForm';
// import ProfileEditInform from 'containers/ProfileEditInform';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Async from 'react-async';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import LocalShippingTwoTone from '@material-ui/icons/LocalShippingTwoTone';
import LocationOn from '@material-ui/icons/LocationOn';
import Settings from '@material-ui/icons/Settings';
import AttachMoney from '@material-ui/icons/AttachMoney';
import CreditCard from '@material-ui/icons/CreditCard';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking, apiRequest } from 'globalUtils';

import { Grid, CardHeader } from '@material-ui/core';
import makeSelectProfileWholePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import {
    mainGetProfile,
} from './actions';
import styles from './materialStyle';

const getProfile = () => apiRequest('/layout/user', 'get');

const getOrder = () => apiRequest('/order?per-page=1', 'get');

const getAddress = () => apiRequest('/address?per-page=1', 'get');

const getWishList = () => apiRequest('/wishlist?per-page=6', 'get');

const getCart = () => apiRequest('/cart?per-page=4', 'get');

const getData = () => Promise.all([getProfile(), getOrder(), getAddress(), getWishList(), getCart()]);

export class ProfileWholePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        subpage: null,
    }

    componentWillMount() {
        withWidth();
        console.log(window.outerWidth);
        this.props.dispatch(mainGetProfile());
        if (dataChecking(this.props, 'match', 'params', 'profilePart')) {
            this.setState({ subpage: this.props.match.params.profilePart });
        }
    }

    getWalletData = (data) => (
        <div>
            <Card className={this.props.classes.smallCard}>
                <CardContent>
                    <Avatar aria-label="AttachMoney">
                        <AttachMoney />
                    </Avatar>
                    <Typography variant="h6" align="left">Balance</Typography>
                    <Typography>{data.data.profile.balance.usable}</Typography>
                </CardContent>
            </Card>
            <Card className={this.props.classes.smallCard}>
                <CardContent>
                    <Avatar aria-label="CreditCard">
                        <CreditCard />
                    </Avatar>
                    <Typography variant="h6" align="left">Credit</Typography>
                    <Typography>{data.data.profile.credit.usable}</Typography>
                </CardContent>
            </Card>
            <Card className={this.props.classes.smallCard}>
                <CardContent>
                    <Avatar aria-label="AccountBalanceWallet">
                        <AccountBalanceWallet />
                    </Avatar>
                    <Typography variant="h6" align="left">Voucher</Typography>
                    <Typography>{data.data.profile.voucher.usable}</Typography>
                </CardContent>
            </Card>
        </div>
    )

    showedWallet = 1;

    clickSidebarButtonAction = (tempsubpage) => {
        this.setState({ subpage: tempsubpage });
        this.props.history.push(`/profile/${tempsubpage}`);
    }

    renderProfileCard = (data) => {
        let concernString = '';
        // eslint-disable-next-line array-callback-return
        let count = 0;
        // eslint-disable-next-line array-callback-return
        data.data.profile.skin.concerns.map((concern, index) => {
            if (index < 4) {
                concernString += `${concernString !== '' ? ',' : ''}${concern.name} `;
            } else if (index >= 4 && count === 0) {
                concernString += '...';
                count++;
            }
        });
        // const user = this.props.profileWholePage.data.mainProfileData;
        return (
            // <div className="ProfileWholePage-container">
            //     <div className="ProfileWholePage-sidebar">
            //         {/* <img src={user.avatar} alt="" /> */}
            //         <span>{user.name}</span><br />
            //         <span>{user.membership.name}</span><br />
            //         <span>Usable Credits {user.credit.usable}</span><br />
            //         <span>Usable Balance {user.balance.usable}</span><br />

            //         <span onClick={() => this.clickSidebarButtonAction('me')}><FormattedMessage {...messages.Profile} /></span><br />
            //         <span onClick={() => this.clickSidebarButtonAction('order')}><FormattedMessage {...messages.Order} /></span><br />
            //         <span onClick={() => this.clickSidebarButtonAction('wallet')}><FormattedMessage {...messages.Wallet} /></span><br />
            //         <span onClick={() => this.clickSidebarButtonAction('review')}><FormattedMessage {...messages.Review} /></span><br />
            //         <span onClick={() => this.clickSidebarButtonAction('wishlist')}><FormattedMessage {...messages.Wishlist} /> ({user.wishlist.total} )</span><br />
            //         <span onClick={() => this.clickSidebarButtonAction('setting')}><FormattedMessage {...messages.Setting} /></span><br />
            //         <span onClick={() => this.clickSidebarButtonAction('logout')}><FormattedMessage {...messages.Logout} /></span><br />
            //     </div>
            //     <div className="ProfileWholePage-content">
            //         {this.state.subpage === 'me' ? <div><ProfileEditInform /></div> : null}
            //         {
            //             this.state.subpage === 'order' ||
            //             this.state.subpage === 'canceled' ||
            //             this.state.subpage === 'to-paid' ||
            //             this.state.subpage === 'to-ship'
            //                 ?
            //                     <div>
            //                         <ProfileOrder />
            //                     </div>
            //                 :
            //                 null
            //         }
            //         {this.state.subpage === 'wallet' ? <div><ProfileWallet /></div> : null}
            //         {this.state.subpage === 'review' ? <div><ProfileReview /></div> : null}
            //         {this.state.subpage === 'wishlist' ? <div><ProfileWishlist /></div> : null}
            //         {/* {this.state.subpage === 'ProfileSetting' ? <ProfileSetting /> : null} */}
            //         {this.state.subpage === 'logout' ? <div><LogoutForm /></div> : null}
            //     </div>
            // </div>
            <div align="center">
                <Card className={this.props.classes.longCard}>
                    <Grid container={true} spacing={8} alignItems="center">
                        <Grid item={true} lg={3} md={4} sm={6}>
                            <CardContent>
                                <Grid container={true} spacing={24} direction="row">
                                    <Grid item={true} xs={4} className={this.props.classes.profileContentContainer}>
                                        <Avatar src={data.data.profile.avatar} alt="user" className={this.props.classes.userImage} />
                                    </Grid>
                                    <Grid item={true} xs={8}>
                                        <Grid container={true} spacing={16}>
                                            <Grid item={true} xs={8} align="left">
                                                <Typography variant="subtitle1">Hello,</Typography>
                                            </Grid>
                                            <Grid item={true} xs={8} align="left">
                                                <Typography variant="h6" color="primary">{data.data.profile.name}</Typography>
                                            </Grid>
                                            <Grid item={true} xs={8}>
                                                <Button variant="outlined">EDIT PROFILE</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                        {
                            this.props.width === 'sm' ?
                            null
                            :
                            <Grid item={true} lg={3} md={4}>
                                <CardContent className={this.props.classes.profileContentContainer} style={{ justifyContent: this.props.width === 'md' ? 'center' : 'left' }}>
                                    <Typography variant="subtitle1">
                                        {data.data.profile.name}<br />
                                        {data.data.profile.email}<br />
                                        {data.data.profile.sms_phone.prefix}-{data.data.profile.sms_phone.number}<br />
                                        {data.data.profile.gender}<br />
                                    </Typography>
                                </CardContent>
                            </Grid>
                        }
                        {
                            this.props.width === 'sm' || this.props.width === 'md' ?
                            null
                            :
                            <Grid item={true} lg={3}>
                                <CardContent className={this.props.classes.profileContentContainer}>
                                    <Typography variant="subtitle2">
                                        Skin Tone: {data.data.profile.skin.tone.name}<br />
                                        Skin Type: {data.data.profile.skin.type.name}<br />
                                        Skin Concern: {concernString}<br />
                                    </Typography>
                                </CardContent>
                            </Grid>
                        }
                        <Grid item={true} lg={3} md={4} sm={6}>
                            <CardContent>
                                <Grid container={true} spacing={8}>
                                    <Grid item={true} xs={6} className={this.props.classes.profileContentContainer}>
                                        <div align="center">
                                            <Typography variant="subtitle1" color="secondary">Attendence</Typography><br />
                                            <Typography variant="h6" color="secondary">{data.data.attendance.current}  /  10</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item={true} xs={4}>
                                        <Typography>I am PICTURE</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        );
    }

    // remember data insert below
    renderWallet = () => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <AccountBalanceWallet color="disabled" />
                }
                title={<Typography variant="h6" align="left">My Wallet</Typography>}
            />
            <Grid container={true} spacing={0} justify="center">
                {
                    this.props.width === 'md' || this.props.width === 'sm' ?
                        <Grid item={true}>
                            <Button onClick={() => { }}><Avatar><ArrowLeft /></Avatar></Button>
                        </Grid>
                    :
                        null
                }
                <Grid item={true}>
                    <CardContent style={{ padding: '0px' }}>

                    </CardContent>
                </Grid>
                {
                    this.props.width === 'md' || this.props.width === 'sm' ?
                        <Grid item={true}>
                            <Button onClick={() => { }}><Avatar><ArrowRight /></Avatar></Button>
                        </Grid>
                    :
                    null
                }
            </Grid>
        </Card>
    )

    renderOrder = (data) => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <LocalShippingTwoTone color="disabled" />
                }
                title={<Typography variant="h6" align="left">My Order</Typography>}
            />
            <CardContent style={{ paddingTop: '0px' }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ flex: '4' }}>
                        <Typography noWrap={true}>ORDER NUMBER</Typography>
                        <Typography noWrap={true} className="mt-half">{data.data.items.length ? data.data.items[0].number : null}</Typography>
                    </div>
                    <div style={{ flex: '3' }}>
                        <Typography noWrap={true}>AMOUNT</Typography>
                        <Typography noWrap={true} className="mt-half">{data.data.items.length ? data.data.items[0].subtotal : 'No Order'}</Typography>
                    </div>
                    <div style={{ flex: '3' }}>
                        <Typography noWrap={true}>STATUS</Typography>
                        <Typography noWrap={true} className="mt-half">{data.data.items.length ? data.data.items[0].status : null}</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    renderAddress = (data) => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <LocationOn color="disabled" />
                }
                title={<Typography variant="h6" align="left">My Address</Typography>}
            />
            <CardContent className={this.props.classes.profileContentContainer} style={{ display: 'inline', paddingTop: '0px' }}>
                <Typography>Default Address :</Typography>
                <Typography>{data.data.items[0].full_address}</Typography>
            </CardContent>
        </Card>
    )

    renderSetting = () => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <Settings color="disabled" />
                }
                title={<Typography variant="h6" align="left">My Setting</Typography>}
            />
            <CardContent></CardContent>
        </Card>
    )

    renderWishList = (data) => (
        <Card className={`${this.props.classes.bigCard}`}>
            <CardHeader
                avatar={
                    <FavoriteBorder color="disabled" />
                }
                title={<Typography variant="h6" align="left">My Wishlist</Typography>}
            />
            <CardContent>
                <Grid container={true} justify="center">
                    {
                        data.data.items.slice(0, this.props.width === 'md' || this.props.width === '' ? 4 : 6).map((item, index) => (
                            <Grid lg={4} item={true} key={index}>
                                <img src={item.product.image.medium} alt={item.product.name} />
                            </Grid>
                        ))
                    }
                </Grid>
            </CardContent>
        </Card>
    )

    renderCart = (data) => (
        <Card className={`${this.props.classes.bigCard} mb-3`}>
            <CardHeader
                avatar={
                    <AddShoppingCart color="disabled" />
                }
                title={<Typography variant="h6" align="left">My Cart</Typography>}
            />
            <CardContent style={{ marginTop: '0px' }}>
                {
                    // got 2 merchant
                    data.data.merchants.map((merchant) => (
                        merchant.items.slice(0, 4).map((item, index) => (
                            <Card className={this.props.classes.cartCard} key={index}>
                                <CardHeader
                                    title={<img src={item.product.image.small} width="55px" style={{ marginLeft: '10px' }} alt={item.product.name} />}
                                />
                                <CardContent style={{ width: '80%' }}>
                                    <div style={{ float: 'left', width: '60%' }}>
                                        <Typography>{item.product.brand.name}</Typography>
                                        <Typography>{item.product.display_name}</Typography>
                                    </div>
                                    <Typography>{item.qty}</Typography>
                                    <Typography style={{ float: 'right' }}>RM{item.total.retail}</Typography>
                                </CardContent>
                            </Card>
                        ))
                    ))
                }
            </CardContent>
        </Card>
        )

    render() {
        return (
            <div align="center">
                <Async promise={getData()}>
                    <Async.Loading>Loading... Page</Async.Loading>
                    <Async.Resolved>
                        {(data) => (
                            <div>
                                <div style={{ width: '80%' }} className="mt-1">
                                    <Typography style={{ float: 'left' }} >Profile</Typography>
                                    <Typography inline="true">Welcome to your HERMO profile Dashboard</Typography>
                                    <Typography style={{ float: 'right' }} >Continue Shopping</Typography>
                                </div>
                                <div className={this.props.classes.pageContainer}>
                                    {this.renderProfileCard(data[0])}
                                    <Grid container={true} spacing={20} style={{ paddingTop: '0px' }}>
                                        <Grid item={true} md={3} xs={6}>
                                            {this.renderWallet(data[0])}
                                        </Grid>
                                        <Grid item={true} md={3} xs={6}>
                                            {this.renderOrder(data[1])}
                                        </Grid>
                                        <Grid item={true} md={3} xs={6}>
                                            {this.renderAddress(data[2])}
                                        </Grid>
                                        <Grid item={true} md={3} xs={6}>
                                            {this.renderSetting()}
                                        </Grid>
                                    </Grid>
                                    <Grid container={true} spacing={20} style={{ paddingTop: '0px' }} justify="center">
                                        <Grid item={true} md={6} xs={11}>
                                            {this.renderWishList(data[3])}
                                        </Grid>
                                        <Grid item={true} md={6} xs={11}>
                                            {this.renderCart(data[4])}
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        )}
                    </Async.Resolved>
                    <Async.Rejected>
                        { console.error }
                    </Async.Rejected>
                </Async>
            </div>
        );
    }
}

ProfileWholePage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    profileWholePage: makeSelectProfileWholePage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profileWholePage', reducer });
const withSaga = injectSaga({ key: 'profileWholePage', saga });

export default compose(
    withWidth(),
    withStyles(styles),
    withReducer,
    withSaga,
    withConnect,
)(ProfileWholePage);
