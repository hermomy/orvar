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

const getWallet = () => apiRequest('/voucher?usable=true&per-page=1', 'get');

const getData = () => Promise.all([getProfile(), getWallet()]);

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

    clickSidebarButtonAction = (tempsubpage) => {
        this.setState({ subpage: tempsubpage });
        this.props.history.push(`/profile/${tempsubpage}`);
    }

    renderProfileCard = (data) => {
        let concernString = '';
        // eslint-disable-next-line array-callback-return
        data.data.profile.skin.concerns.map((concern) => {
            concernString += `${concernString !== '' ? ',' : ''}${concern.name} `;
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
            <div>
                <Grid container={true} spacing={40}>
                    <Card>
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
                    </Card>
                    <Card>
                        <CardContent className={this.props.classes.profileContentContainer}>
                            <Typography variant="subtitle1" className="mt-2">
                                {data.data.profile.name}<br />
                                {data.data.profile.email}<br />
                                {data.data.profile.sms_phone.prefix}-{data.data.profile.sms_phone.number}<br />
                                {data.data.profile.gender}<br />
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className={this.props.classes.profileContentContainer}>
                            <Typography variant="subtitle2" className="mt-2">
                                Skin Tone: {data.data.profile.skin.tone.name}<br />
                                Skin Type: {data.data.profile.skin.type.name}<br />
                                Skin Concern:{concernString}<br />
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
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
                    </Card>
                </Grid>
            </div>
        );
    }

    renderWallet = () => (
        <Card>
            <CardHeader
                avatar={<Avatar aria-label="Recipe">R</Avatar>}
                // action={<IconButton></IconButton>}
                title="My Wallet"
            />
            <CardContent>
                <Card style={{ width: '88px' }}>
                    <CardHeader
                        avatar={<Avatar aria-label="Recipe">R</Avatar>}
                        // action={<IconButton></IconButton>}
                    />
                </Card>
            </CardContent>
        </Card>
    )

    render() {
        return (
            <div>
                <Async promise={getData()}>
                    <Async.Loading>Loading... Page</Async.Loading>
                    <Async.Resolved>
                        {(data) => (
                            <div>
                                {console.log(this.props)}
                                {this.renderProfileCard(data[0])}
                                {this.renderWallet(data[1])}
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
