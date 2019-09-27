/**
*
* ProfilePage
*
*/

import React from 'react';

import { apiRequest, dataChecking } from 'globalUtils';

import OwlCarousel from 'react-owl-carousel2';
import 'assets/react-owl-carousel2.style.scss';

import Async from 'assets/react-async';
import { NavLink } from 'react-router-dom';
import {
    withStyles,
    Avatar,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Grid,
    Button,
    IconButton,
    Hidden,
    CircularProgress,
    Divider,
    Fade,
    Paper,
} from '@material-ui/core';
import {
    AccountBalanceWallet,
    LocalShippingOutlined,
    LocationOn,
    Settings,
    AttachMoney,
    CreditCard,
    FavoriteBorder,
    AddShoppingCart,
    Create,
    CardGiftcard,
    AccountBox,
    PersonPinCircle,
    MailOutline,
    ChatBubbleOutline,
    Assignment,
    LocalActivity,
    Clear,
    KeyboardArrowLeft,
} from '@material-ui/icons';
import { notifySuccess, notifyError } from 'containers/Notify';
import withWidth from '@material-ui/core/withWidth';
import ProductCard from 'components/ProductCard';

// import { FormattedMessage } from 'react-intl';

// import messages from './messages';
import './style.scss';
import materialStyleExtension from './materialStyle';

class ProfilePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        skindetail: false,
        recommend: 0,
        width: this.props.width,
    }

    componentWillMount() {
        this.setState({
            personalizationData: apiRequest(null, 'get', null, 'https://reco.hermo.my/v2/personalization'),
            cartData: apiRequest('/cart?per-page=4', 'get'),
            wishlistData: apiRequest('/wishlist?per-page=6', 'get'),
            addressData: apiRequest('/address?per-page=1', 'get'),
            orderData: apiRequest('/order?per-page=1', 'get'),
            profileData: apiRequest('/layout/user', 'get'),
        });

        this.orderdetails = [
            { icon: <CreditCard />, name: 'Unpaid', number: 'to-paid' },
            { icon: <MailOutline />, name: 'To Ship', number: 'to-ship' },
            { icon: <LocalShippingOutlined />, name: 'Posted', number: 'to-receive' },
            { icon: <ChatBubbleOutline />, name: 'Review', number: 'to-review' },
        ];
        this.walletdetails = [
            { icon: <AttachMoney />, name: 'Balance', number: 'balance' },
            { icon: <CreditCard />, name: 'Credit', number: 'credit' },
            { icon: <LocalActivity />, name: 'Voucher', number: 'voucher' },
        ];
    }

    postAttendance = async () => {
        const res = await apiRequest('/attendance', 'post');
        if (dataChecking(res, 'data', 'messages')) {
            if (res.data.messages[0].type === 'error') {
                notifyError(res.data.messages[0].text);
            } else {
                notifySuccess(res.data.messages[0].text);
            }
        }
    }

    renderProfileCard = (data) => {
        let concernString = '';
        data.data.profile.skin.concerns.forEach((concern) => {
            concernString += `${concernString !== '' ? ',' : ''} ${concern.name}`;
        });
        return (
            <Card className={this.props.classes.profileCard}>
                <CardContent>
                    <Grid container={true} spacing={1}>
                        <Grid item={true} xs={5} style={{ textAlign: 'left' }}>
                            <Avatar src={data.data.profile.avatar} alt="user" className={this.props.classes.userImage} style={{ margin: '1rem' }} /><br />
                            <NavLink to={'/profile/detail'} title="title" style={{ textDecoration: 'none' }}>
                                <Button>
                                    <Typography variant="body1" color="secondary" >Edit Profile</Typography>
                                    <Create color="secondary" />
                                </Button>
                            </NavLink>
                            <Button disabled={true}>
                                <CardGiftcard style={{ marginRight: '1rem', color: '#660033' }} />
                                <Typography variant="body1" >{data.data.profile.membership.name}</Typography>
                            </Button>
                        </Grid>
                        <Grid item={true} xs={7}>
                            <Button style={{ marginTop: '10px', cursor: 'pointer' }} onClick={() => this.setState({ skindetail: true })}>
                                <AccountBox color="secondary" style={{ marginRight: '1rem' }} />
                                <Typography variant="body1" color="secondary" >{data.data.profile.name} Skin Details <b color="secondary">&gt;</b></Typography>
                            </Button>
                            <Divider style={{ margin: '1rem' }} />
                            <Grid container={true} spacing={0}>
                                <Button onClick={() => this.postAttendance()}>
                                    <Grid item={true} xs={2}>
                                        <PersonPinCircle />
                                    </Grid>
                                    <Grid item={true} xs={9} style={{ textAlign: 'left' }}>
                                        <Typography align="left" variant="body1" gutterBottom={true}>Update Your attendance here today !</Typography><br />
                                        <Typography variant="body1" color="secondary">{data.data.attendance.current}/10 Yes! I&#183;m Here</Typography>
                                    </Grid>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Fade in={this.state.skindetail === true}>
                        <Card className={this.props.classes.skinDetailPopUp} style={{ zIndex: `${this.state.skindetail ? 10 : -1}`, marginLeft: '-16px' }}>
                            <CardContent style={{ textAlign: 'left' }}>
                                <Typography variant="subtitle1" gutterBottom={true}>Skin Details</Typography>
                                <IconButton style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }} onClick={() => this.setState({ skindetail: false })}>
                                    <Clear />
                                </IconButton>
                                <Grid container={true} spacing={0}>
                                    <Grid item={true} xs={6}>
                                        <Typography variant="body2" gutterBottom={true} className={this.props.classes.grayColorWord}>Skin Colour: </Typography><Typography variant="body2">{data.data.profile.skin.tone.name}</Typography>
                                    </Grid>
                                    <Grid item={true} xs={6}>
                                        <Typography variant="body2" gutterBottom={true} className={this.props.classes.grayColorWord}>Skin Type: </Typography><Typography variant="body2">{data.data.profile.skin.type.name}</Typography>
                                    </Grid>
                                    <Grid item={true} xs={12} className="mt-1">
                                        <Typography variant="body2" className={this.props.classes.grayColorWord}>Skin Concern: </Typography><Typography variant="body2">{concernString}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Fade>
                </CardContent>
            </Card>
        );
    }

    renderSmallScreenProfileCard = (data) => (
        <Hidden mdUp={true}>
            <Card style={{ marginBottom: '16px' }}>
                <CardContent>
                    <Grid container={true}>
                        <Grid item={true} xs={6} style={{ textAlign: 'left' }}>
                            <Typography variant="h5" color="primary" gutterBottom={true}>{data.data.profile.name}</Typography><br />
                            <Typography variant="body1" color="secondary">Edit Profile  &gt;</Typography>
                        </Grid>
                        <Grid item={true} xs={6} style={{ textAlign: 'right' }}>
                            <Avatar src={data.data.profile.avatar} alt="user" className={this.props.classes.userImage} /><br />
                            <Button disabled={true}>
                                <CardGiftcard color="primary" style={{ marginRight: '10px' }} />
                                <Typography variant="body1" color="secondary" > {data.data.profile.membership.name}</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Hidden>
    )

    renderOrder = (profiledata) => (
        <Card>
            <CardHeader
                avatar={
                    <Assignment style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="subtitle1">My Order</Typography>}
                action={
                    <NavLink to="/profile/order" style={{ textDecoration: 'none' }}>
                        <Typography color="secondary">View All</Typography>
                    </NavLink>
                  }
            />
            <CardContent>
                <Grid container={true}>
                    {
                        this.orderdetails.map((orderdetail, index) => (
                            <Grid key={index} item={true} xs={3}>
                                <div>
                                    {orderdetail.icon}<br />
                                    <Typography variant="body2">{orderdetail.name}</Typography><br />
                                    <Typography variant="body2">{profiledata.data.profile.order[orderdetail.number]}</Typography>
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
            </CardContent>
        </Card>
    )

    renderWallet = (data) => (
        <Card>
            <CardHeader
                avatar={
                    <AccountBalanceWallet style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="subtitle1">My Wallet</Typography>}
            />
            <CardContent>
                <Grid container={true} spacing={0}>
                    {
                        this.walletdetails.map((walletdetail, index) => (
                            <Grid item={true} xs={4} key={index}>
                                <Card style={{ boxShadow: 'none' }}>
                                    {walletdetail.icon}<br />
                                    <Typography variant="subtitle1">{walletdetail.name}</Typography><br />
                                    <Typography className={this.props.classes.walletCardNum}>{data.data.profile[walletdetail.number].usable}</Typography>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </CardContent>
        </Card>
    )
    renderRewards = () => (
        <Card>
            <CardHeader
                title={<Typography variant="subtitle1">Rewards</Typography>}
            />
            <CardContent style={{ textAlign: 'left' }}>
                <NavLink to={'/profile/rewards'}>
                    <Typography variant="subtitle1" >More Rewards&gt;</Typography>
                </NavLink>
            </CardContent>
        </Card>
    )
    renderReview = () => (
        <Card>
            <CardHeader
                title={<Typography variant="subtitle1">Review</Typography>}
            />
            <CardContent style={{ textAlign: 'left' }}>
                <NavLink to={'/profile/review'}>
                    <Typography variant="subtitle1" >My Reviews &gt;</Typography>
                </NavLink>
            </CardContent>
        </Card>
    )
    renderAddress = () => (
        <Card>
            <CardHeader
                avatar={
                    <LocationOn style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="subtitle1">My Address</Typography>}
                action={
                    <NavLink to={'/profile/address'}>
                        <IconButton>
                            <Create style={{ color: '#808080' }} />
                        </IconButton>
                    </NavLink>
                  }
            />
            <CardContent style={{ textAlign: 'left' }}>
                <Async promise={this.state.addressData}>
                    <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                    <Async.Resolved>
                        {(addressData) => (
                            <div>
                                {
                                    addressData.data.items ?
                                        <div>
                                            <Typography variant="body2" className={this.props.classes.grayColorWord}>Default Address :</Typography><br />
                                            <Typography variant="body2">{addressData.data.items[0].full_address}</Typography>
                                        </div>
                                    :
                                        <Typography variant="body2" className={this.props.classes.grayColorWord}>Havent set :(</Typography>
                                }
                            </div>
                            )}
                    </Async.Resolved>
                    <Async.Rejected>
                        { console.error }
                    </Async.Rejected>
                </Async>
            </CardContent>
        </Card>
    )

    renderSetting = () => (
        <Card>
            <CardHeader
                avatar={
                    <LocationOn style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="subtitle1">My Setting</Typography>}
            />
            <CardContent style={{ textAlign: 'left' }}>
                <Typography variant="body2">Edit your password here</Typography><br />
                <Typography variant="subtitle1" >Go to Setting &gt;</Typography>
            </CardContent>
        </Card>
    )

    renderCustomerCare = () => (
        <Card>
            <CardHeader
                avatar={
                    <Settings style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="subtitle1">Customer Care</Typography>}
            />
            <CardContent style={{ textAlign: 'left' }}>
                <Typography gutterBottom={true} variant="body2">Need help? You may contact our helpdesk at</Typography><br />
                <Typography gutterBottom={true} variant="body2"color="secondary">admin@hermo.my</Typography><br />
                <Typography variant="body1" color="secondary">07-5623567</Typography>
            </CardContent>
        </Card>
    )

    renderWishList = () => (
        <Card>
            <CardHeader
                avatar={
                    <FavoriteBorder style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="subtitle1">My Wishlist</Typography>}
            />
            <CardContent>
                <Grid container={true} spacing={0}>
                    <Async promise={this.state.wishlistData}>
                        <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                        <Async.Resolved>
                            {(wishlistData) => (
                                <div>
                                    <Grid container={true} spacing={2} alignContent="center" style={{ textAlign: 'center' }}>
                                        {
                                            wishlistData.data.items ?
                                            wishlistData.data.items.slice(0, this.props.width === 'xs' ? 4 : 6).map((item, index) => (
                                                <Grid xs={6} sm={4} item={true} key={index}>
                                                    <NavLink to={`/mall/${item.product.id}`}>
                                                        <img width="100%" src={item.product.image.medium} alt={item.product.name} className="mb-half" />
                                                    </NavLink>
                                                </Grid>
                                            ))
                                            :
                                                null
                                        }
                                    </Grid>
                                    <NavLink to="/profile/wishlist" style={{ textDecoration: 'none' }}>
                                        <Typography variant="body1" color="secondary">View All Wishlist</Typography>
                                    </NavLink>
                                </div>
                            )}
                        </Async.Resolved>
                        <Async.Rejected>
                            { console.error }
                        </Async.Rejected>
                    </Async>
                </Grid>
            </CardContent>
        </Card>
    )

    renderCart = () => (
        <Card>
            <CardHeader
                avatar={
                    <AddShoppingCart style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="subtitle1" align="left">My Cart</Typography>}
            />
            <CardContent>
                <Async promise={this.state.cartData}>
                    <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                    <Async.Resolved>
                        {(cartData) => (
                            <div>
                                {
                                    cartData.data.merchants ?
                                    cartData.data.merchants.map((merchant) => (
                                            merchant.items.slice(0, 2).map((item, index) => (
                                                <NavLink key={index} to={`/mall/${item.product.id}`} style={{ textDecoration: 'none' }}>
                                                    <Paper style={{ marginBottom: '1rem', boxShadow: 'none' }}>
                                                        <Grid container={true} style={{ textAlign: 'left' }} alignItems="center">
                                                            <Grid item={true} xs={2}>
                                                                <img src={item.product.image.small} width="55px" alt={item.product.name} />
                                                            </Grid>
                                                            <Grid item={true} xs={8}>
                                                                <Typography variant="body2">{item.product.display_name}</Typography>
                                                            </Grid>
                                                            <Grid item={true} xs={2}>
                                                                <Typography variant="body2">{item.price.selling}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Paper>
                                                </NavLink>
                                            ))
                                        ))
                                    :
                                        null
                                }
                            </div>
                        )}
                    </Async.Resolved>
                    <Async.Rejected>
                        { console.error }
                    </Async.Rejected>
                </Async>
            </CardContent>
        </Card>
        )

    renderRecommendProduct = (data, arrayindex) => (
        // <NavLink to={`/mall/${data.data.data.product.items[this.state.recommend + arrayindex].id}`}>
        <ProductCard
            key={data.data.data.product.items[this.state.recommend + arrayindex].id}
            product={data.data.data.product.items[this.state.recommend + arrayindex]}
            review={data.data.data.product.items[this.state.recommend + arrayindex].review}
            url={data.data.data.product.items[this.state.recommend + arrayindex].url}
            price={dataChecking(data.data.data.product.items[this.state.recommend + arrayindex], 'price')}
            allowWishlistButton={true}
        />
        // </NavLink>
    )

    renderRecommend = (profiledata) => {
        if (this.state.width !== this.props.width) {
            this.state.width = this.props.width;
            this.state.recommend = 0;
        }
        return (
            <Card>
                <CardHeader
                    avatar={
                        <AccountBox style={{ color: 'F8E1E7' }} />
                    }
                    title={<Typography variant="subtitle1">Because you have {profiledata.data.profile.skin.type.name}</Typography>}
                />
                <CardContent style={{ position: 'relative' }}>
                    <Async promise={this.state.personalizationData}>
                        <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                        <Async.Resolved>
                            {(personalizationdata) => {
                                if (dataChecking(personalizationdata, 'data', 'data', 'product', 'items', 'length')) {
                                    return (
                                        <OwlCarousel
                                            ref={(ref) => this.setState({ owlCarouselInstance: ref })}
                                            options={{
                                                loop: true,
                                                nav: true,
                                                dots: true,
                                                navText: ['&lt;', '&gt;'],
                                                responsive: {
                                                    320: {
                                                        items: 2,
                                                    },
                                                    700: {
                                                        items: 3,
                                                    },
                                                    1024: {
                                                        items: 4,
                                                    },
                                                    1280: {
                                                        items: 5,
                                                    },
                                                },
                                            }}
                                            // events={{
                                            //     onDragged: (event) => console.log(event),
                                            //     onChanged: (event) => console.log(event),
                                            // }}
                                        >
                                            {
                                                personalizationdata.data.data.product.items.map((item) => (
                                                    <ProductCard
                                                        key={item.id}
                                                        product={item}
                                                        url={item.url}
                                                        image={true}
                                                        feature={true}
                                                        rating={true}
                                                        disableElevation={true}
                                                    />
                                                ))
                                            }
                                        </OwlCarousel>
                                    );
                                }
                                return null;
                            }}
                        </Async.Resolved>
                        <Async.Rejected>
                            { console.error }
                        </Async.Rejected>
                    </Async>
                </CardContent>
            </Card>
        );
    }

    // attendance api
    // order card view all
    // card title only can like this because if not view all will go to left
    // cart price and RM
    // recommendation api

    render() {
        return (
            <div className="container">
                <Async promise={this.state.profileData}>
                    <Async.Loading><CircularProgress className={this.props.classes.progress} /></Async.Loading>
                    <Async.Resolved>
                        {(profiledata) => (
                            <div className="mb-3">
                                {this.renderSmallScreenProfileCard(profiledata)}
                                <div justify="center">
                                    <Hidden smDown={true}>
                                        <div style={{ margin: '1rem 0' }}>
                                            <KeyboardArrowLeft style={{ float: 'left', color: 'rgba(0, 0, 0, 0.26)' }} />
                                            <Typography color="primary">Hello {profiledata.data.profile.name}</Typography>
                                            <AccountBox style={{ float: 'right', marginLeft: '40px', color: 'rgba(0, 0, 0, 0.26)' }} />
                                            <PersonPinCircle style={{ float: 'right', color: 'rgba(0, 0, 0, 0.26)' }} />
                                        </div>
                                    </Hidden>
                                    <Grid container={true} spacing={2}>
                                        <Hidden smDown={true}>
                                            <Grid item={true} md={6} sm={12}>
                                                {this.renderProfileCard(profiledata)}
                                            </Grid>
                                        </Hidden>
                                        <Grid item={true} md={6} xs={12}>
                                            {this.renderOrder(profiledata)}
                                        </Grid>
                                        <Grid item={true} xs={12} sm={6} md={3}>
                                            {this.renderWallet(profiledata)}
                                        </Grid>
                                        <Grid item={true} xs={12} sm={6} md={3}>
                                            {this.renderRewards()}
                                        </Grid>
                                        <Grid item={true} xs={12} sm={6} md={3}>
                                            {this.renderReview()}
                                        </Grid>
                                        <Grid item={true} xs={12} sm={6} md={3}>
                                            {this.renderAddress()}
                                        </Grid>
                                        <Grid item={true} xs={12} sm={6} md={3}>
                                            {this.renderSetting()}
                                        </Grid>
                                        <Grid item={true} xs={12} sm={6} md={3}>
                                            {this.renderCustomerCare()}
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            {this.renderWishList()}
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            {this.renderCart()}
                                        </Grid>
                                        <Grid item={true} xs={12}>
                                            {this.renderRecommend(profiledata)}
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

ProfilePage.propTypes = {

};

// export default ProfilePage;
export default
    withStyles(materialStyleExtension)(
        withWidth()(
            ProfilePage
        )
    );
