/* eslint-disable react/no-unescaped-entities */
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
import { NavLink } from 'react-router-dom';

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
import LocalShippingOutlined from '@material-ui/icons/LocalShippingOutlined';
import LocationOn from '@material-ui/icons/LocationOn';
import Settings from '@material-ui/icons/Settings';
import AttachMoney from '@material-ui/icons/AttachMoney';
import CreditCard from '@material-ui/icons/CreditCard';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Create from '@material-ui/icons/Create';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import AccountBox from '@material-ui/icons/AccountBox';
import PersonPinCircle from '@material-ui/icons/PersonPinCircle';
import MailOutline from '@material-ui/icons/MailOutline';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import Assignment from '@material-ui/icons/Assignment';
import LocalActivity from '@material-ui/icons/LocalActivity';
import Clear from '@material-ui/icons/Clear';
import Fade from '@material-ui/core/Fade';
import Badge from '@material-ui/core/Badge';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import MobileStepper from '@material-ui/core/MobileStepper';

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
        callAPI: true,
        skindetail: false,
        recommend: 0,
        width: this.props.width,
    }

    componentWillMount() {
        withWidth();
        this.props.dispatch(mainGetProfile());
        if (dataChecking(this.props, 'match', 'params', 'profilePart')) {
            this.setState({ subpage: this.props.match.params.profilePart });
        }
        console.log(this.props.width);
    }

    showedWallet = 1;

    renderProfileCard = (data) => {
        this.setState({ callAPI: false });
        let concernString = '';
        data.data.profile.skin.concerns.forEach((concern) => {
            concernString += `${concernString !== '' ? ',' : ''} ${concern.name}`;
        });
        return (
            <Card className={this.props.classes.mediumCardProfile} style={{ width: `${this.props.width === 'xs' || this.props.width === 'sm' ? '95%' : '97.5%'}`, position: 'relative', backgroundColor: `${this.props.width === 'xs' ? '#fff' : '#F3EFEE'}` }}>
                <Grid container={true} spacing={0}>
                    <Grid item={true} xs={5}>
                        <div style={{ textAlign: 'left', paddingTop: '0px' }}>
                            <Avatar src={data.data.profile.avatar} alt="user" className={this.props.classes.userImage} /><br />
                            {/* <Typography variant="h6" color="primary">{data.data.profile.name}</Typography> */}
                            <div style={{ marginLeft: '10px' }}>
                                <NavLink to={'/profile/detail'} title="title" style={{ textDecoration: 'none' }}>
                                    <Button>
                                        <Typography variant="body1" color="secondary" inline={true} style={{ marginTop: '7px' }}>Edit Profile</Typography>
                                        <Create style={{ fontSize: '14px', color: '#ff146A' }} />
                                    </Button>
                                </NavLink>
                                <br />
                                <Button disabled={true}>
                                    <CardGiftcard style={{ marginRight: '10px', color: '#660033' }} />
                                    <Typography variant="body1" inline={true}>{data.data.profile.membership.name}</Typography>
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item={true} xs={7}>
                        <CardContent style={{ textAlign: 'left', width: '80%', padding: '0px' }}>
                            <Button style={{ marginTop: '10px', cursor: 'default' }} onClick={() => this.setState({ skindetail: true })}>
                                <AccountBox style={{ marginRight: '17px', color: '#ff146A' }} />
                                <Typography variant="body1" color="secondary" inline={true}>{data.data.profile.name} Skin Details <b color="secondary">></b></Typography>
                            </Button>
                            <Divider style={{ marginTop: '20px' }} />
                            <Grid container={true} spacing={0} style={{ margin: '20px 0px 0px 7px' }} >
                                <Grid item={true} xs={1}>
                                    <Badge color="secondary">
                                        <PersonPinCircle />
                                    </Badge>
                                </Grid>
                                <Grid item={true} xs={11} style={{ textAlign: 'left' }}>
                                    <Typography style={{ marginLeft: '17px' }} align="left" variant="body1">Update Your attendance here today !</Typography><br />
                                    <Typography style={{ marginLeft: '17px' }} variant="body1" color="secondary">{data.data.attendance.current}/10 Yes!I&#183;m Here</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
                <div style={{ position: 'absolute', zIndex: `${this.state.skindetail ? 10 : -1}`, top: `${this.state.skindetail ? '0' : '50px'}` }}>
                    <Fade in={this.state.skindetail === true}>
                        <Card className={this.props.skinDetailPopUp} style={{ position: 'relative', width: '100%', height: '250px', marginLeft: '0px' }}>
                            <CardContent style={{ textAlign: 'justify' }}>
                                <Typography variant="subtitle1">Skin Details</Typography>
                                <IconButton style={{ position: 'absolute', top: '1px', right: '5px' }} onClick={() => this.setState({ skindetail: false })}>
                                    <Clear />
                                </IconButton>
                                <Grid container={true} spacing={0} style={{ margin: '10px 0' }}>
                                    <Grid item={true} xs={6}>
                                        <Typography variant="body2" className={this.props.classes.skinDetail}>Skin Colour: </Typography><Typography variant="body2" style={{ display: 'inline' }}>{data.data.profile.skin.tone.name}</Typography>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Typography variant="body2" className={this.props.classes.skinDetail}>Skin Type: </Typography><Typography variant="body2" style={{ display: 'inline' }}>{data.data.profile.skin.type.name}</Typography>
                                    </Grid>
                                </Grid>
                                <Typography variant="body2" className={this.props.classes.skinDetail}>Skin Concern: </Typography><Typography variant="body2" style={{ display: 'inline' }}>{concernString}</Typography>
                            </CardContent>
                        </Card>
                    </Fade>
                </div>
            </Card>
        );
    }

    renderSmallScreenProfileCard = (data) => (
        <Hidden smUp={true}>
            <Card className={this.props.classes.smallScreenLongCard}>
                <CardContent style={{ width: '100%', marginTop: '10px' }}>
                    <Grid container={true} spacing={0}>
                        <Grid item={true} xs={6} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                            <Typography variant="h5" color="primary" gutterBottom={true}>{data.data.profile.name}</Typography>
                            <Typography variant="body1" color="secondary" inline={true}>Edit Profile  ></Typography>
                        </Grid>
                        <Grid item={true} xs={6} style={{ textAlign: 'right', paddingRight: '10px' }}>
                            <Avatar src={data.data.profile.avatar} alt="user" className={this.props.classes.userImage} /><br />
                            <CardGiftcard style={{ marginRight: '10px', color: '#660033' }} />
                            <Typography variant="body1" color="secondary" inline={true}> {data.data.profile.membership.name}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Hidden>
    )

    renderWallet = (data) => (
        <Card className={this.props.classes.mediumCard} style={{ width: `${this.props.width === 'md' ? '97.2%' : '95%'}` }}>
            <CardHeader
                avatar={
                    <AccountBalanceWallet style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="subtitle1" align="left" className={this.props.classes.cardTtitle}>My Wallet</Typography>}
            />
            <CardContent style={{ justify: 'center', padding: '0px' }}>
                <Grid container={true} spacing={0}>
                    <Grid item={true} xs={4}>
                        <Card className={this.props.classes.smallCard}>
                            <CardContent>
                                <AttachMoney />
                                <Typography variant="subtitle2">Balance</Typography>
                                <Typography className={this.props.classes.walletCardNum}>{data.data.profile.balance.usable}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <Card className={this.props.classes.smallCard}>
                            <CardContent>
                                <CreditCard />
                                <Typography variant="subtitle2">Credit</Typography>
                                <Typography className={this.props.classes.walletCardNum}>{data.data.profile.credit.usable}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <Card className={this.props.classes.smallCard}>
                            <CardContent>
                                <LocalActivity />
                                <Typography variant="subtitle2">Voucher</Typography>
                                <Typography className={this.props.classes.walletCardNum}>{data.data.profile.voucher.usable}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

    renderOrder = () => (
        <Card className={this.props.classes.mediumCard} style={{ width: `${this.props.width === 'xs' || this.props.width === 'sm' ? '95%' : '97.2%'}` }}>
            <div style={{ position: 'relative' }}>
                <CardHeader
                    avatar={
                        <Assignment style={{ color: 'F8E1E7' }} />
                    }
                    title={<Typography variant="h6" className={this.props.classes.cardTtitle}>My Order</Typography>}
                />
                <Typography style={{ position: 'absolute', right: '20px', top: '20px' }}>View All</Typography>
            </div>
            <CardContent className={this.props.classes.OrderContent}>
                <Grid container={true} style={{ paddingTop: '0px' }}>
                    <Grid item={true} xs={3}>
                        <div>
                            <CreditCard />
                            <Typography variant="body2">Unpaid</Typography>
                        </div>
                    </Grid>
                    <Grid item={true} xs={3}>
                        <div>
                            <MailOutline />
                            <Typography variant="body2">To Ship</Typography>
                        </div>
                    </Grid>
                    <Grid item={true} xs={3}>
                        <div>
                            <LocalShippingOutlined />
                            <Typography variant="body2">Posted</Typography>
                        </div>
                    </Grid>
                    <Grid item={true} xs={3}>
                        <div>
                            <ChatBubbleOutline />
                            <Typography variant="body2">Review</Typography>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )

    renderAddress = (data) => (
        <Card className={this.props.classes.mediumCard} style={{ width: `${this.props.width === 'md' ? '97.2%' : '95%'}` }}>
            <CardHeader
                avatar={
                    <LocationOn style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="h6" align="left" className={this.props.classes.cardTtitle}>My Address</Typography>}
            />
            <CardContent className={this.props.classes.mediumCardContent} style={{ display: 'inline', paddingTop: '0px' }}>
                <Typography variant="body2" className={this.props.classes.skinDetail}>Default Address :</Typography>
                <Typography variant="body2" align="left">{data.data.items[0].full_address}</Typography>
            </CardContent>
        </Card>
    )

    renderSetting = () => (
        <Card className={this.props.classes.mediumCard} style={{ width: `${this.props.width === 'md' ? '97.2%' : '95%'}` }}>
            <CardHeader
                avatar={
                    <LocationOn style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="h6" align="left" className={this.props.classes.cardTtitle}>My Setting</Typography>}
            />
            <CardContent style={{ textAlign: 'left', paddingTop: '0px', height: '100%', padding: '10px 50px' }}>
                <Typography variant="body2">Edit your password here</Typography>
                <Typography variant="subtitle1" style={{ fontWeight: '100', verticalAlign: 'middle' }} inline={true}>Go to Setting </Typography>
                <Typography variant="h6" style={{ color: '#808080', fontWeight: '100', verticalAlign: 'middle' }} inline={true}> > </Typography>
            </CardContent>
        </Card>
    )

    renderCustomerCare = () => (
        <Card className={this.props.classes.mediumCard} style={{ width: `${this.props.width === 'md' ? '97.2%' : '95%'}` }}>
            <CardHeader
                avatar={
                    <Settings style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="h6" align="left" className={this.props.classes.cardTtitle}>Customer Care</Typography>}
            />
            <CardContent className={this.props.classes.mediumCardContent} style={{ display: 'inline', paddingTop: '0px' }}>
                <Typography gutterBottom={true} variant="body2" align="left">Need help? You may contact our helpdesk at</Typography>
                <Typography gutterBottom={true} variant="body2" align="left" color="secondary">admin@hermo.my</Typography>
                <Typography variant="body1" align="left" color="secondary">07-5623567</Typography>
            </CardContent>
        </Card>
    )

    renderWishList = (data) => (
        <Card className={`${this.props.classes.bigCard}`} style={{ width: `${this.props.width === 'xs' || this.props.width === 'sm' ? '95%' : '97.2%'}` }}>
            <CardHeader
                avatar={
                    <FavoriteBorder style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="h6" align="left" className={this.props.classes.cardTtitle}>My Wishlist</Typography>}
            />
            <CardContent style={{ textAlign: 'left', marginRight: '37px' }}>
                <Grid container={true} spacing={0}>
                    {
                        data.data.items ?
                            data.data.items.slice(0, this.props.width === 'xs' ? 4 : 6).map((item, index) => (
                                <Grid xs={6} sm={4} item={true} key={index}>
                                    <img src={item.product.image.medium} alt={item.product.name} />
                                </Grid>
                        ))
                        :
                            null
                    }
                </Grid>
            </CardContent>
        </Card>
    )

    renderCart = (data) => (
        <Card className={`${this.props.classes.bigCard} mb-3`} style={{ width: `${this.props.width === 'xs' || this.props.width === 'sm' ? '95%' : '97.2%'}` }}>
            <CardHeader
                avatar={
                    <AddShoppingCart style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="h6" align="left" className={this.props.classes.cardTtitle}>My Cart</Typography>}
            />
            <CardContent style={{ marginTop: '0px' }}>
                {
                    data.data.merchants ?
                        data.data.merchants.map((merchant) => (
                            merchant.items.slice(0, 4).map((item, index) => (
                                <Card className={this.props.classes.cartCard} key={index}>
                                    <CardHeader
                                        title={<img src={item.product.image.small} width="55px" style={{ marginLeft: '10px' }} alt={item.product.name} />}
                                    />
                                    <CardContent style={{ paddingBottom: '0px', margin: 'auto 0', padding: '0px' }}>
                                        <div style={{ display: 'inline' }}>
                                            <Typography align="left" variant="body2">{item.product.brand.name}</Typography>
                                            <Typography align="left" variant="body2">
                                                {
                                                    this.props.width === 'lg' ?
                                                    item.product.display_name
                                                    :
                                                    item.product.plain_name
                                                }
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ))
                    :
                        null
                }
            </CardContent>
        </Card>
        )

    renderRecommend = (data, userdata) => {
        if (this.state.width !== this.props.width) {
            this.state.width = this.props.width;
            this.state.recommend = 0;
        }
        return (
            <Card className={this.props.classes.longCard} style={{ width: `${this.props.width === 'xs' || this.props.width === 'sm' ? '94.5%' : '98.7%'}` }}>
                <CardHeader
                    avatar={
                        <AccountBox style={{ color: 'F8E1E7' }} />
                    }
                    title={<Typography variant="h6" align="left" className={this.props.classes.cardTtitle}>Because you have {userdata.data.profile.skin.type.name}</Typography>}
                />
                <CardContent style={{ position: 'relative', paddingTop: '0px' }} className={this.props.classes.profileContentContainer}>
                    <div className={this.props.classes.recommendProduct}>
                        <img src={data.data.data.product.items[this.state.recommend].image.small} width="60%" alt="" /><br />
                        <Typography variant="body2">{data.data.data.product.items[this.state.recommend].name}</Typography><br />
                    </div>
                    <div className={this.props.classes.recommendProduct}>
                        <img src={data.data.data.product.items[this.state.recommend + 1].image.small} width="60%" alt="" /><br />
                        <Typography variant="body2">{data.data.data.product.items[this.state.recommend + 1].name}</Typography><br />
                    </div>
                    <div className={this.props.classes.recommendProduct}>
                        <img src={data.data.data.product.items[this.state.recommend + 2].image.small} width="60%" alt="" /><br />
                        <Typography variant="body2">{data.data.data.product.items[this.state.recommend + 2].name}</Typography><br />
                    </div>
                    {
                        this.props.width !== 'xs' ?
                            <div className={this.props.classes.recommendProduct}>
                                <img src={data.data.data.product.items[this.state.recommend + 3].image.small} width="60%" alt="" /><br />
                                <Typography variant="body2">{data.data.data.product.items[this.state.recommend + 3].name}</Typography><br />
                            </div>
                        :
                            null
                    }
                    <MobileStepper
                        steps={12}
                        position="static"
                        variant="progress"
                        activeStep={0}
                        className={this.props.classes.mobileStepper}
                        nextButton={
                            <Button
                                onClick={() => { this.setState({ recommend: this.state.recommend - 1 }); }}
                                disabled={this.state.recommend === 0}
                                classes={{ root: this.props.classes.walletButton }}
                                style={{ position: 'absolute', top: '25%', left: '0' }}
                            >
                                <KeyboardArrowLeft />
                            </Button>
                        }
                        backButton={
                            <Button
                                onClick={() => { this.setState({ recommend: this.state.recommend + 1 }); }}
                                disabled={`${this.state.recommend}` === `${this.props.width === 'xl' || this.props.width === 'lg' || this.props.width === 'md' ? 8 : 9}`}
                                classes={{ root: this.props.classes.walletButton }}
                                style={{ position: 'absolute', top: '25%', right: '0' }}
                            >
                                <KeyboardArrowRight />
                            </Button>
                        }
                    />
                </CardContent>
            </Card>
        );
    }

    render() {
        return (
            <div align="center" className="container">
                <Async promise={getData(this.state.callAPI)}>
                    <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                    <Async.Resolved>
                        {(data) => (
                            <div>
                                {this.renderSmallScreenProfileCard(data[0])}
                                <div className={`${this.props.width === 'xs' ? '' : this.props.classes.pageContainer}`} style={{ padding: `${this.props.width === 'lg' || this.props.width === 'xl' ? '24px' : '16px'}`, paddingTop: '0px' }} justify="center">
                                    <Hidden only="xs">
                                        <div style={{ marginBottom: '2rem', marginTop: '1rem', width: '98.5%' }}>
                                            <KeyboardArrowLeft style={{ float: 'left', color: 'rgba(0, 0, 0, 0.26)' }} />
                                            <Typography inline={true} color="primary">Hello {data[0].data.profile.name}</Typography>
                                            <AccountBox style={{ float: 'right', marginLeft: '40px', color: 'rgba(0, 0, 0, 0.26)' }} />
                                            <PersonPinCircle style={{ float: 'right', color: 'rgba(0, 0, 0, 0.26)' }} />
                                        </div>
                                    </Hidden>
                                    {/* <Hidden smUp={true}>
                                        {this.renderOrder()}
                                    </Hidden> */}
                                    <Hidden only="xs">
                                        <Grid container={true}>
                                            <Grid item={true} md={6} sm={12}>
                                                {this.renderProfileCard(data[0])}
                                            </Grid>
                                            <Grid item={true} md={6} xs={12}>
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
                                    <Grid container={true} style={{ paddingTop: '0px' }}>
                                        <Grid item={true} md={6} xs={12}>
                                            {this.renderWishList(data[3])}
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            {this.renderCart(data[4])}
                                        </Grid>
                                    </Grid>
                                    {
                                        data[0].data.profile.skin.type.name ?
                                            this.renderRecommend(data[5], data[0])
                                        :
                                            null
                                    }
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
