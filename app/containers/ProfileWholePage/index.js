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
// import ArrowLeft from '@material-ui/icons/ArrowLeft';
// import ArrowRight from '@material-ui/icons/ArrowRight';
// import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';

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
        this.props.dispatch(mainGetProfile());
        if (dataChecking(this.props, 'match', 'params', 'profilePart')) {
            this.setState({ subpage: this.props.match.params.profilePart });
        }
    }

    getWalletData = (data) => (
        this.showedWallet === 1 ?
            <Card className={this.props.classes.smallCard}>
                <CardContent>
                    <Avatar aria-label="AttachMoney">
                        <AttachMoney />
                    </Avatar>
                    <Typography variant="h6" align="left">Balance</Typography>
                    <Typography>{data.data.profile.balance.usable}</Typography>
                </CardContent>
            </Card>
        :
        this.showedWallet === 2 ?
            <Card className={this.props.classes.smallCard}>
                <CardContent>
                    <Avatar aria-label="CreditCard">
                        <CreditCard />
                    </Avatar>
                    <Typography variant="h6" align="left">Credit</Typography>
                    <Typography>{data.data.profile.credit.usable}</Typography>
                </CardContent>
            </Card>
        :
            <Card className={this.props.classes.smallCard}>
                <CardContent>
                    <Avatar aria-label="AccountBalanceWallet">
                        <AccountBalanceWallet />
                    </Avatar>
                    <Typography variant="h6" align="left">Voucher</Typography>
                    <Typography>{data.data.profile.voucher.usable}</Typography>
                </CardContent>
            </Card>
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
                    <Grid container={true} spacing={40}>
                        <Grid item={true} xs={3}>
                            <CardContent>
                                <Grid container={true} spacing={24}>
                                    <Grid item={true} xs={5} className={this.props.classes.profileContentContainer}>
                                        <Avatar src={data.data.profile.avatar} alt="user" className={this.props.classes.userImage} />
                                    </Grid>
                                    <Grid container={true} spacing={24} item={true} xs={7}>
                                        <Grid item={true} xs={12}>
                                            <Typography variant="subtitle1">Hello</Typography>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <Typography variant="h6" color="primary">{data.data.profile.name}</Typography>
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            <Button variant="outlined">EDIT PROFILE</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                        <Grid item={true} xs={3}>
                            <CardContent className={this.props.classes.profileContentContainer}>
                                <Typography variant="subtitle1" className="mt-2">
                                    {data.data.profile.name}<br />
                                    {data.data.profile.email}<br />
                                    {data.data.profile.sms_phone.prefix}-{data.data.profile.sms_phone.number}<br />
                                    {data.data.profile.gender}<br />
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item={true} xs={3}>
                            <CardContent className={this.props.classes.profileContentContainer}>
                                <Typography variant="subtitle2" className="mt-2" align="left">
                                    Skin Tone: {data.data.profile.skin.tone.name}<br />
                                    Skin Type: {data.data.profile.skin.type.name}<br />
                                    Skin Concern: {concernString}<br />
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item={true} xs={3}>
                            <CardContent>
                                <Grid container={true} spacing={24}>
                                    <Grid item={true} xs={7} className={this.props.classes.profileContentContainer}>
                                        <div align="center" className="mt-3">
                                            <Typography variant="subtitle1" color="secondary">Attendence</Typography><br />
                                            <Typography variant="h6" color="secondary">{data.data.attendance.current}  /  10</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item={true} xs={5}>
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

    renderWallet = (data) => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <Avatar aria-label="AccountBalanceWallet">
                        <AccountBalanceWallet />
                    </Avatar>
                }
                title={<Typography variant="h6" align="left">My Wallet</Typography>}
            />
            <Grid container={true} spacing={0} justify="center">
                {/* <Grid item={true}>
                    <Button onClick={() => { }}><Avatar><ArrowLeft /></Avatar></Button>
                </Grid> */}
                <Grid item={true}>
                    <CardContent style={{ padding: '0px' }}>
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
                    </CardContent>
                </Grid>
                {/* <Grid item={true}>
                    <Button onClick={() => { }}><Avatar><ArrowRight /></Avatar></Button>
                </Grid> */}
            </Grid>
        </Card>
    )

    renderOrder = (data) => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <Avatar aria-label="LocalShipping">
                        <LocalShippingTwoTone />
                    </Avatar>
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
                    <Avatar aria-label="LocationOn">
                        <LocationOn />
                    </Avatar>
                }
                title={<Typography variant="h6" align="left">My Address</Typography>}
            />
            <CardContent className={this.props.classes.profileContentContainer} style={{ display: 'inline', paddingTop: '0px' }}>
                <Typography>Default Address :</Typography>
                <Typography inline={true}>{data.data.items[0].full_address}</Typography>
            </CardContent>
        </Card>
    )

    renderSetting = () => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <Avatar aria-label="Settings">
                        <Settings />
                    </Avatar>
                }
                title={<Typography variant="h6" align="left">My Setting</Typography>}
            />
            <CardContent></CardContent>
        </Card>
    )

    renderWishList = (data) => (
        <Card className={`${this.props.classes.bigCard} mb-3`}>
            <CardHeader
                avatar={
                    <Avatar aria-label="FavoriteBorder">
                        <FavoriteBorder />
                    </Avatar>
                }
                title={<Typography variant="h6" align="left">My Wishlist</Typography>}
            />
            <CardContent>
                <Grid container={true}>
                    {
                        data.data.items.map((item, index) => (
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
                    <Avatar aria-label="AddShoppingCart">
                        <AddShoppingCart />
                    </Avatar>
                }
                title={<Typography variant="h6" align="left">My Cart</Typography>}
            />
            <CardContent style={{ marginTop: '0px' }}>
                {
                    // got 2 merchant
                    data.data.merchants.map((merchant) => (
                        merchant.items.slice(0, 4).map((item) => (
                            <Card className={this.props.classes.cartCard}>
                                <CardHeader
                                    title={<img src={item.product.image.small} width="55px" style={{ marginLeft: '10px' }} alt={item.product.name} />}
                                />
                                <CardContent>
                                    <Grid container={true} spacing={20} direction="row" alignItems="center">
                                        <Grid item={true} xs={6}>
                                            <Typography>{item.product.brand.name}</Typography>
                                            <Typography>{item.product.display_name}</Typography>
                                        </Grid>
                                        <Grid item={true} xs={3}>
                                            <Typography>{item.qty}</Typography>
                                        </Grid>
                                        <Grid item={true} xs={1}>
                                            <Typography>RM{item.total.retail}</Typography>
                                        </Grid>
                                    </Grid>
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
                                    <Typography style={{ float: 'left' }} inline={true}>Profile</Typography>
                                    <Typography inline={true}>Welcome to your HERMO profile Dashboard</Typography>
                                    <Typography style={{ float: 'right' }} inline={true}>Continue Shopping</Typography>
                                </div>
                                <div className={this.props.classes.pageContainer}>
                                    {this.renderProfileCard(data[0])}
                                    <br />
                                    {this.renderWallet(data[0])}
                                    {this.renderOrder(data[1])}
                                    {this.renderAddress(data[2])}
                                    {this.renderSetting()}
                                    <br />
                                    {this.renderWishList(data[3])}
                                    {this.renderCart(data[4])}
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
    withStyles(styles),
    withReducer,
    withSaga,
    withConnect,
)(ProfileWholePage);
