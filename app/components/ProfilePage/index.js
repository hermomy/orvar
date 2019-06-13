/**
*
* ProfilePage
*
*/

import React from 'react';

import { apiRequest } from 'globalUtils';

import Async from 'assets/react-async';
import {
    Typography,
    Hidden,
    Card,
    CardContent,
    Avatar,
    CircularProgress,
    Grid,
    CardHeader,
    // IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import {
    KeyboardArrowLeft,
    CardGiftcard,
    AccountBox,
    PersonPinCircle,
    AttachMoney,
    CreditCard,
    AccountBalanceWallet,
    LocalActivity,
    LocationOn,
    Settings,
    ChatBubbleOutline,
    LocalShippingOutlined,
    MailOutline,
    Assignment,
    AddShoppingCart,
} from '@material-ui/icons/';

// import { FormattedMessage } from 'react-intl';

// import messages from './messages';
import './style.scss';
import materialStyleExtension from './materialStyle';

class ProfilePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentWillMount() {
        this.setState({
            profileData: apiRequest('/layout/user', 'get'),
            orderData: apiRequest('/order?per-page=1', 'get'),
            addressData: apiRequest('/address?per-page=1', 'get'),
            wishListData: apiRequest('/wishlist?per-page=6', 'get'),
            cartData: apiRequest('/cart?per-page=4', 'get'),
            personalizationData: apiRequest(null, 'get', null, 'https://reco.hermo.my/v2/personalization'),
        });
    }

    renderSmallScreenProfileCard = (data) => (
        <Hidden smUp={true}>
            <Card className={this.props.classes.smallScreenLongCard}>
                <CardContent style={{ width: '100%', marginTop: '10px' }}>
                    <Grid container={true} spacing={0}>
                        <Grid item={true} xs={6} style={{ textAlign: 'left', paddingLeft: '10px' }}>
                            <Typography variant="h5" color="primary" gutterBottom={true}>{data.data.profile.name}</Typography>
                            <Typography variant="body1" color="secondary" inline={true}>Edit Profile  &gt;</Typography>
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

    renderOrder = () => (
        <Card className={this.props.classes.mediumCard}>
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

    renderWallet = (data) => (
        <Card>
            <CardHeader
                avatar={
                    <AccountBalanceWallet style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="subtitle1" align="left" className={this.props.classes.cardTtitle}>My Wallet</Typography>}
            />
            <CardContent style={{ justify: 'center' }}>
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

    renderSetting = () => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <LocationOn style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="h6" align="left" className={this.props.classes.cardTtitle}>My Setting</Typography>}
            />
            <CardContent style={{ textAlign: 'left' }}>
                <Typography variant="body2">Edit your password here</Typography>
                <Typography variant="subtitle1" style={{ fontWeight: '100', verticalAlign: 'middle' }} inline={true}>Go to Setting </Typography>
                <Typography variant="h6" style={{ color: '#808080', fontWeight: '100', verticalAlign: 'middle' }} inline={true}> &gt; </Typography>
            </CardContent>
        </Card>
    )

    renderCustomerCare = () => (
        <Card className={this.props.classes.mediumCard}>
            <CardHeader
                avatar={
                    <Settings style={{ color: 'F8E1E7' }} />
                }
                title={<Typography variant="h6" align="left" className={this.props.classes.cardTtitle}>Customer Care</Typography>}
            />
            <CardContent className={this.props.classes.mediumCardContent}>
                <Typography gutterBottom={true} variant="body2" align="left">Need help? You may contact our helpdesk at</Typography>
                <Typography gutterBottom={true} variant="body2" align="left" color="secondary">admin@hermo.my</Typography>
                <Typography variant="body1" align="left" color="secondary">07-5623567</Typography>
            </CardContent>
        </Card>
    )

    renderCart = (data) => (
        <Card className={`${this.props.classes.bigCard} mb-3`}>
            <CardHeader
                avatar={
                    <AddShoppingCart style={{ color: '#F8E1E7' }} />
                }
                title={<Typography variant="h6" align="left" className={this.props.classes.cardTtitle}>My Cart</Typography>}
            />
            <CardContent>
                {
                    data.data.merchants ?
                        data.data.merchants.map((merchant) => (
                            merchant.items.slice(0, 4).map((item, index) => (
                                <Card className={this.props.classes.cartCard} key={index}>
                                    <CardHeader
                                        title={<img src={item.product.image.small} alt={item.product.name} />}
                                    />
                                    <CardContent>
                                        <div>
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

    render() {
        return (
            <div align="center" className="container">
                <Async promise={this.state.profileData}>
                    <Async.Loading><CircularProgress /></Async.Loading>
                    <Async.Resolved>
                        {(userData) => (
                            <div>
                                {this.renderSmallScreenProfileCard(userData)}
                                <div justify="center">
                                    <Hidden only="xs">
                                        <div>
                                            <KeyboardArrowLeft style={{ float: 'left', color: 'rgba(0, 0, 0, 0.26)' }} />
                                            <Typography inline={true} color="primary">Hello {userData.data.profile.name}</Typography>
                                            <AccountBox style={{ float: 'right', marginLeft: '40px', color: 'rgba(0, 0, 0, 0.26)' }} />
                                            <PersonPinCircle style={{ float: 'right', color: 'rgba(0, 0, 0, 0.26)' }} />
                                        </div>
                                        <Grid container={true} spacing={16}>
                                            <Grid item={true} md={6} sm={12}>
                                                {/* {this.renderProfileCard(userData)} */}
                                            </Grid>
                                            <Grid item={true} md={6} xs={12}>
                                                {this.renderOrder()}
                                            </Grid>
                                        </Grid>
                                    </Hidden>
                                    <Grid container={true} spacing={16}>
                                        <Grid item={true} xs={12} md={6} lg={3}>
                                            {this.renderWallet(userData)}
                                        </Grid>
                                        <Grid item={true} xs={12} md={6} lg={3}>
                                            {/* {this.renderAddress(data[2])} */}
                                        </Grid>
                                        <Grid item={true} xs={12} md={6} lg={3}>
                                            {this.renderSetting()}
                                        </Grid>
                                        <Grid item={true} xs={12} md={6} lg={3}>
                                            {this.renderCustomerCare()}
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            {/* {this.renderWishList(data[3])} */}
                                        </Grid>
                                        <Grid item={true} md={6} xs={12}>
                                            <Async promise={this.state.cartData}>
                                                <Async.Loading>
                                                    <CircularProgress />
                                                </Async.Loading>
                                                <Async.Resolved>
                                                    {(cartData) => this.renderCart(cartData)}
                                                </Async.Resolved>
                                                <Async.Rejected>
                                                    { console.error }
                                                </Async.Rejected>
                                            </Async>
                                        </Grid>
                                    </Grid>
                                    {/* {
                                        data.data.profile.skin.type.name ?
                                            this.renderRecommend(data[5], data)
                                        :
                                            null
                                    } */}
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
export default withStyles(materialStyleExtension)(ProfilePage);
