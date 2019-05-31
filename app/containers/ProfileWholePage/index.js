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
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
// import Collapse from '@material-ui/core/Collapse';
import AccountBalanceWallet from '@material-ui/icons/AccountBalanceWallet';
import LocalShippingTwoTone from '@material-ui/icons/LocalShippingTwoTone';
import LocationOn from '@material-ui/icons/LocationOn';
import Settings from '@material-ui/icons/Settings';
import AttachMoney from '@material-ui/icons/AttachMoney';
import CreditCard from '@material-ui/icons/CreditCard';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Create from '@material-ui/icons/Create';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import AccountBox from '@material-ui/icons/AccountBox';
import ChevronRight from '@material-ui/icons/ChevronRight';
import PersonPinCircle from '@material-ui/icons/PersonPinCircle';
import MailOutline from '@material-ui/icons/MailOutline';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import Assignment from '@material-ui/icons/Assignment';
import Clear from '@material-ui/icons/Clear';
import Fade from '@material-ui/core/Fade';
import Badge from '@material-ui/core/Badge';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import ArrowRight from '@material-ui/icons/ArrowRight';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { dataChecking, apiRequest } from 'globalUtils';

import { Grid, CardHeader, IconButton } from '@material-ui/core';
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

const getPersonalization = () => apiRequest(null, 'get', null, 'https://reco.hermo.my/v2/personalization');

const getData = (callAPI) => callAPI ? Promise.all([getProfile(), getOrder(), getAddress(), getWishList(), getCart(), getPersonalization()]) : null;

export class ProfileWholePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        // subpage: null,
        checked: 1,
        callAPI: true,
        skindetail: false,
        recommend: 0,
    }

    componentWillMount() {
        withWidth();
        this.props.dispatch(mainGetProfile());
        if (dataChecking(this.props, 'match', 'params', 'profilePart')) {
            this.setState({ subpage: this.props.match.params.profilePart });
        }
        console.log(this.props.width);
    }

    getWalletData = (data) => (
        <div>
            <Card className={this.props.classes.smallCard}>
                <CardContent>
                    <AttachMoney />
                    <Typography align="left">Balance</Typography>
                    <Typography>{data.data.profile.balance.usable}</Typography>
                </CardContent>
            </Card>
            <Card className={this.props.classes.smallCard}>
                <CardContent>
                    <CreditCard />
                    <Typography align="left">Credit</Typography>
                    <Typography>{data.data.profile.credit.usable}</Typography>
                </CardContent>
            </Card>
            <Card className={this.props.classes.smallCard}>
                <CardContent>
                    <AccountBalanceWallet />
                    <Typography align="left">Voucher</Typography>
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

    renderOldProfileCard = (data) => {
        this.setState({ callAPI: false });
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
        return (
            <Hidden xsDown={true}>
                <div style={{ alignItems: 'center', position: 'relative' }}>
                    <Card className={this.props.classes.longCard}>
                        {/* <Hidden only="xl">
                            <div style={{ borderLeft: '1.5px solid #F3EFEE', height: '150px', position: 'absolute', left: '25%', top: '25px' }}></div>
                            <div style={{ borderLeft: '1.5px solid #F3EFEE', height: '150px', position: 'absolute', left: '50%', top: '25px' }}></div>
                            <div style={{ borderLeft: '1.5px solid #F3EFEE', height: '150px', position: 'absolute', left: '75%', top: '25px' }}></div>
                        </Hidden>
                        <Hidden only="md">
                            <div style={{ borderLeft: '1.5px solid #F3EFEE', height: '150px', position: 'absolute', left: '33%', top: '25px' }}></div>
                            <div style={{ borderLeft: '1.5px solid #F3EFEE', height: '150px', position: 'absolute', left: '66%', top: '25px' }}></div>
                        </Hidden> */}
                        <Grid container={true} spacing={8} alignItems="center">
                            <Grid item={true} lg={3} md={4} sm={6}>
                                <CardContent>
                                    <Grid container={true} spacing={24} direction="row">
                                        <Grid item={true} xs={3} className={this.props.classes.profileContentContainer}>
                                            <Avatar src={data.data.profile.avatar} alt="user" className={this.props.classes.userImage} />
                                        </Grid>
                                        <Grid item={true} xs={8}>
                                            <Grid container={true} spacing={16} style={{ textAlign: 'left' }}>
                                                <Grid item={true} xs={8}>
                                                    <Typography variant="subtitle1">Hello,</Typography>
                                                </Grid>
                                                <Grid item={true} xs={8}>
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
                            <Hidden only="sm">
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
                            </Hidden>
                            <Hidden mdDown={true}>
                                <Grid item={true} lg={3}>
                                    <CardContent className={this.props.classes.profileContentContainer}>
                                        <Typography variant="subtitle2">
                                            Skin Tone: {data.data.profile.skin.tone.name}<br />
                                            Skin Type: {data.data.profile.skin.type.name}<br />
                                            Skin Concern: {concernString}<br />
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Hidden>
                            <Grid item={true} lg={3} md={4} sm={6}>
                                <CardContent>
                                    <Grid container={true} spacing={8} alignItems="center">
                                        <Grid item={true} xs={6}>
                                            <div align="center">
                                                <Typography variant="subtitle1" color="secondary">Attendence</Typography><br />
                                                <Typography variant="h6" color="secondary">{data.data.attendance.current}  /  10</Typography>
                                            </div>
                                        </Grid>
                                        <Grid item={true} xs={6}>
                                            <img width="130px" src={require('images/regularMember.jpg')} alt="" style={{ marginTop: '15px' }} />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </Hidden>
        );
    }

    renderProfileCard = (data) => {
        this.setState({ callAPI: false });
        let concernString = '';
        data.data.profile.skin.concerns.forEach((concern) => {
            concernString += `${concernString !== '' ? ',' : ''}${concern.name} `;
        });
        return (
            <Card className={this.props.classes.bigShortCard} style={{ width: `${this.props.width === 'xs' || this.props.width === 'sm' ? '95%' : '97.5%'}`, position: 'relative' }}>
                <Grid container={true} spacing={0}>
                    <Grid item={true} xs={5}>
                        <CardContent style={{ textAlign: 'left', paddingTop: '0px' }}>
                            <Avatar src={data.data.profile.avatar} alt="user" className={this.props.classes.userImage} />
                            <div style={{ marginTop: '10px' }} />
                            <Typography variant="h6" color="primary">{data.data.profile.name}</Typography><br />
                            <Typography variant="h6" color="primary">Edit Profile</Typography>
                            <Create />
                            <div style={{ marginTop: '10px' }} />
                            <CardGiftcard style={{ marginRight: '10px' }} />
                            <Typography variant="h6" color="primary"> {data.data.profile.membership.name}</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item={true} xs={7}>
                        <CardContent style={{ textAlign: 'left' }}>
                            <div style={{ marginTop: '10px', cursor: 'default' }} onClick={() => this.setState({ skindetail: true })}>
                                <AccountBox style={{ marginRight: '10px' }} />
                                <Typography variant="h6" color="primary">{data.data.profile.name} Skin Details </Typography>
                                <ChevronRight />
                            </div>
                            <div style={{ marginTop: '30px' }} />
                            <Divider />
                            <div style={{ marginTop: '30px' }} />
                            <Grid container={true} spacing={0}>
                                <Grid item={true} xs={1}>
                                    <Badge color="secondary">
                                        <PersonPinCircle style={{ marginLeft: '4px' }} />
                                    </Badge>
                                </Grid>
                                <Grid item={true} xs={11} style={{ textAlign: 'left' }}>
                                    <Typography style={{ marginLeft: '17px' }} align="left" variant="body1" color="primary">Update Your attendance here today !</Typography><br />
                                    <Typography style={{ marginLeft: '17px' }} variant="h6" color="primary">{data.data.attendance.current}/10 Yes!I&#183;m Here</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
                <div style={{ position: 'absolute', zIndex: '10', top: `${this.state.skindetail ? '0' : '50px'}` }}>
                    <Fade in={this.state.skindetail === true}>
                        <Card className={this.props.skinDetailPopUp} style={{ position: 'relative', width: '100%', height: '250px', marginLeft: '0px' }}>
                            <CardContent style={{ textAlign: 'justify' }}>
                                <Typography>Skin Details</Typography>
                                <IconButton style={{ position: 'absolute', top: '1px', right: '5px' }} onClick={() => this.setState({ skindetail: false })}>
                                    <Clear />
                                </IconButton>
                                <Grid container={true} spacing={0}>
                                    <Grid item={true} xs={6}>
                                        <Typography style={{ display: 'inline' }}>Skin Colour:</Typography><Typography style={{ display: 'inline' }}>{data.data.profile.skin.tone.name}</Typography>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Typography style={{ display: 'inline' }}>Skin Type:</Typography><Typography style={{ display: 'inline' }}>{data.data.profile.skin.type.name}</Typography>
                                    </Grid>
                                </Grid>
                                <Typography style={{ display: 'inline' }}>Skin Concern:</Typography><Typography style={{ display: 'inline' }}>{concernString}</Typography>
                            </CardContent>
                        </Card>
                    </Fade>
                </div>
            </Card>
        );
    }

    renderSmallScreenProfileCard = (data) => (
        <Hidden smUp={true}>
            <Card className={this.props.classes.smallScreenLongCard} style={{ margin: '0px', borderRadius: '0px' }}>
                <CardContent>
                    <Grid container={true} spacing={0}>
                        <Grid item={true} xs={6}>
                            <Grid container={true} spacing={0} style={{ textAlign: 'left' }}>
                                <Grid item={true} xs={12}>
                                    <Avatar src={data.data.profile.avatar} alt="user" className={this.props.classes.userImage} />
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Typography variant="h6" color="primary">{data.data.profile.name}</Typography>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <Button variant="outlined">EDIT PROFILE</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item={true} xs={6} style={{ textAlign: 'right' }}>
                            <Grid container={true} spacing={0}>
                                <Grid item={true} xs={12}>
                                    <Typography>Continue Shopping</Typography>
                                </Grid>
                                <Grid item={true} xs={12}>
                                    <img width="100px" src={require('images/regularMember.jpg')} alt="" style={{ marginTop: '15px' }} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Hidden>
    )

    renderWallet = (data) => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <AccountBalanceWallet color="disabled" />
                }
                title={<Typography variant="h6" align="left">My Wallet</Typography>}
            />
            <Grid container={true} spacing={0} justify="center" alignItems="center">
                {/* {
                    this.props.width === 'md' || this.props.width === 'sm' ?
                        <Grid item={true}>
                            <Button
                                onClick={() => { this.setState({ checked: this.state.checked - 1 }); }}
                                disabled={this.state.checked === 1}
                                classes={{
                                    root: this.props.classes.walletButton,
                                }}
                            >
                                <ArrowLeft />
                            </Button>
                        </Grid>
                    :
                    null
                } */}
                <Grid item={true}>
                    {
                        // !this.props.width ?
                        //     <CardContent style={{ padding: '0px' }}>
                        //         <Collapse in={this.state.checked === 1}>
                        //             <Card className={this.props.classes.smallCard}>
                        //                 <CardContent>
                        //                     <Avatar aria-label="AttachMoney">
                        //                         <AttachMoney />
                        //                     </Avatar>
                        //                     <Typography variant="h6" align="left">Balance</Typography>
                        //                     <Typography>{data.data.profile.balance.usable}</Typography>
                        //                 </CardContent>
                        //             </Card>
                        //         </Collapse>
                        //         <Collapse in={this.state.checked === 2}>
                        //             <Card className={this.props.classes.smallCard}>
                        //                 <CardContent>
                        //                     <Avatar aria-label="CreditCard">
                        //                         <CreditCard />
                        //                     </Avatar>
                        //                     <Typography variant="h6" align="left">Credit</Typography>
                        //                     <Typography>{data.data.profile.credit.usable}</Typography>
                        //                 </CardContent>
                        //             </Card>
                        //         </Collapse>
                        //         <Collapse in={this.state.checked === 3}>
                        //             <Card className={this.props.classes.smallCard}>
                        //                 <CardContent>
                        //                     <Avatar aria-label="AccountBalanceWallet">
                        //                         <AccountBalanceWallet />
                        //                     </Avatar>
                        //                     <Typography variant="h6" align="left">Voucher</Typography>
                        //                     <Typography>{data.data.profile.voucher.usable}</Typography>
                        //                 </CardContent>
                        //             </Card>
                        //         </Collapse>
                        //     </CardContent>
                        // :
                        this.getWalletData(data)
                    }
                </Grid>
                {/* {
                    this.props.width === 'md' || this.props.width === 'sm' ?
                        <Grid item={true}>
                            <Button
                                onClick={() => { this.setState({ checked: this.state.checked + 1 }); }}
                                disabled={this.state.checked === 3}
                                classes={{
                                    root: this.props.classes.walletButton,
                                }}
                            >
                                <ArrowRight />
                            </Button>
                        </Grid>
                    :
                    null
                } */}
            </Grid>
        </Card>
    )

    renderOrder = () => (
        <Card className={this.props.width === 'xs' ? this.props.classes.bigShortCardSticky : this.props.classes.bigShortCard} style={{ width: `${this.props.width === 'xs' || this.props.width === 'sm' ? '95%' : '97.5%'}` }}>
            <div style={{ position: 'relative' }}>
                <CardHeader
                    avatar={
                        <Assignment color="disabled" />
                    }
                    title={<Typography variant="h6">My Order</Typography>}
                />
                <Typography style={{ position: 'absolute', right: '20px', top: '20px' }}>View All</Typography>
            </div>
            <CardContent style={{ paddingTop: '0px' }}>
                <Grid container={true} style={{ paddingTop: '0px', marginTop: '2    0px' }}>
                    <Grid item={true} xs={3}>
                        <div>
                            <CreditCard />
                            <Typography>Unpaid</Typography>
                        </div>
                    </Grid>
                    <Grid item={true} xs={3}>
                        <div>
                            <MailOutline />
                            <Typography>To Ship</Typography>
                        </div>
                    </Grid>
                    <Grid item={true} xs={3}>
                        <div>
                            <LocalShippingTwoTone />
                            <Typography>Posted</Typography>
                        </div>
                    </Grid>
                    <Grid item={true} xs={3}>
                        <div>
                            <ChatBubbleOutline />
                            <Typography>Review</Typography>
                        </div>
                    </Grid>
                </Grid>
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
                    <LocationOn color="disabled" />
                }
                title={<Typography variant="h6" align="left">My Setting</Typography>}
            />
            <CardContent></CardContent>
        </Card>
    )

    renderCustomerCare = () => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <Settings color="disabled" />
                }
                title={<Typography variant="h6" align="left">Customer Care</Typography>}
            />
            <CardContent className={this.props.classes.profileContentContainer} style={{ display: 'inline', paddingTop: '0px' }}>
                <Typography gutterBottom={true}>Need help? You may contact our helpdesk at</Typography>
                <Typography gutterBottom={true}>admin@hermo.my</Typography>
                <Typography>07-5623567</Typography>
            </CardContent>
        </Card>
    )

    renderWishList = (data) => (
        <Card className={`${this.props.classes.bigCard}`} style={{ width: `${this.props.width === 'xs' || this.props.width === 'sm' ? '95%' : '97.5%'}` }}>
            <CardHeader
                avatar={
                    <FavoriteBorder color="disabled" />
                }
                title={<Typography variant="h6" align="left">My Wishlist</Typography>}
            />
            <CardContent>
                <Grid container={true} justify="center" spacing={0}>
                    {
                        data.data.items.slice(0, this.props.width === 'xs' ? 4 : 6).map((item, index) => (
                            <Grid xs={6} sm={4} item={true} key={index}>
                                <img src={item.product.image.medium} alt={item.product.name} />
                            </Grid>
                        ))
                    }
                </Grid>
            </CardContent>
        </Card>
    )

    renderCart = (data) => (
        <Card className={`${this.props.classes.bigCard} mb-3`} style={{ width: `${this.props.width === 'xs' || this.props.width === 'sm' ? '95%' : '97.5%'}` }}>
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
                                    <Grid container={true} spacing={0} alignItems="center">
                                        {/* <Grid item={true} xs={9} md={10} lg={9}> */}
                                        <div style={{ display: 'inline', verticalAlign: 'middle' }}>
                                            <Typography align="left">{item.product.brand.name}</Typography>
                                            <Typography align="left">
                                                {
                                                    this.props.width === 'lg' ?
                                                    item.product.display_name
                                                    :
                                                    item.product.plain_name
                                                }
                                            </Typography>
                                        </div>
                                        {/* </Grid> */}
                                        {/* <Hidden mdDown={true}>
                                            <Grid item={true} xs={1}>
                                                <Typography style={{ display: 'inline' }}>{item.qty}</Typography>
                                            </Grid>
                                        </Hidden>
                                        <Grid item={true} xs={2}>
                                            <Typography style={{ display: 'inline' }}>RM{item.total.retail}</Typography>
                                        </Grid> */}
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))
                    ))
                }
            </CardContent>
        </Card>
        )

    renderRecommend = (data) => (
        <Card className={this.props.classes.longCard}>
            <CardHeader
                avatar={
                    <AccountBox color="disabled" />
                }
                title={<Typography variant="h6" align="left">Because you have Dry Skin</Typography>}
            />
            <CardContent style={{ position: 'relative' }} className={this.props.classes.profileContentContainer}>
                <Button
                    onClick={() => { this.setState({ checked: this.state.recommend - 1 }); }}
                    disabled={this.state.recommend === 0}
                    classes={{
                        root: this.props.classes.walletButton,
                    }}
                    style={{ position: 'absolute', top: '25%', left: '0' }}
                >
                    <ArrowLeft />
                </Button>
                <div style={{ overflow: 'auto', whiteSpace: 'nowrap' }}>
                    {
                        data.data.data.product.items.map((item, index) => (
                            <div id={index} style={{ display: 'inline-block', textAlign: 'center', width: '200px' }}>
                                <img src={item.image.small} width="60%" alt="" /><br />
                                <Typography style={{ wordBreak: 'keep-all' }}>{item.name}</Typography><br />
                            </div>
                        ))
                    }
                </div>
                <Button
                    onClick={() => { this.setState({ checked: this.state.recommend + 1 }); }}
                    disabled={this.state.recommend === 6}
                    classes={{
                        root: this.props.classes.walletButton,
                    }}
                    style={{ position: 'absolute', top: '25%', right: '0' }}
                >
                    <ArrowRight />
                </Button>
            </CardContent>
        </Card>
    )

    render() {
        return (
            <div align="center" className="container" style={{ backgroundColor: '#fff' }}>
                <Async promise={getData(this.state.callAPI)}>
                    <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                    <Async.Resolved>
                        {(data) => (
                            <div>
                                {this.renderSmallScreenProfileCard(data[0])}
                                <div className={`${this.props.width === 'xs' ? '' : this.props.classes.pageContainer}`} style={{ padding: `${this.props.width === 'md' || this.props.width === 'sm' || this.props.width === 'xs' ? '16px' : '24px'}` }} justify="center">
                                    <div className="pt-1">
                                        <Hidden only="xs">
                                            <Typography style={{ float: 'left' }} >Profile</Typography>
                                            <Typography inline={true}>Welcome to your HERMO profile Dashboard</Typography>
                                        </Hidden>
                                        <Hidden xsDown={true}>
                                            <Typography style={{ float: 'right' }} >Continue Shopping</Typography>
                                        </Hidden>
                                    </div>
                                    {/* {this.renderOldProfileCard(data[0])} */}
                                    <Hidden smUp={true}>
                                        {this.renderOrder()}
                                    </Hidden>
                                    <Hidden only="xs">
                                        <Grid container={true} justify="center">
                                            <Grid item={true} lg={6} sm={12}>
                                                {this.renderProfileCard(data[0])}
                                            </Grid>
                                            <Grid item={true} lg={6} xs={12}>
                                                {this.renderOrder()}
                                            </Grid>
                                        </Grid>
                                    </Hidden>
                                    <Grid container={true} style={{ paddingTop: '0px' }}>
                                        <Grid item={true} xs={12} md={6} lg={3}>
                                            {this.renderWallet(data[0])}
                                        </Grid>
                                        <Grid item={true} xs={12} md={6} lg={3}>
                                            {this.renderAddress(data[2])}
                                        </Grid>
                                        <Grid item={true} xs={12} md={6} lg={3}>
                                            {this.renderSetting()}
                                        </Grid>
                                        <Grid item={true} xs={12} md={6} lg={3}>
                                            {this.renderCustomerCare()}
                                        </Grid>
                                    </Grid>
                                    <Grid container={true} style={{ paddingTop: '0px' }} justify="center">
                                        <Grid item={true} lg={6} xs={12}>
                                            {this.renderWishList(data[3])}
                                        </Grid>
                                        <Grid item={true} lg={6} xs={12}>
                                            {this.renderCart(data[4])}
                                            {console.log(data[5])}
                                        </Grid>
                                    </Grid>
                                    {this.renderRecommend(data[5])}
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
